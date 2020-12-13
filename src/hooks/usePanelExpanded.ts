import { useSnackbar } from 'notistack';
import { useState, useEffect } from 'react';
import { firestore } from '..';
import { settingsDoc } from '../contexts/data/collections';
import { Settings } from '../contexts/data/data.models';
import useData from '../contexts/data/useData/useData';

type SettingsModules = 'mailing' | 'notifications';

interface UsePanelExpandedDetails {
  expanded: boolean;
  togglePanel: () => void;
  settings: Settings;
  document: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;
}

function usePanelExpanded(name: SettingsModules): UsePanelExpandedDetails {
  const [expanded, setExpanded] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const {
    settings,
    user: { email }
  } = useData();
  const document = firestore.doc(settingsDoc(email || 'initial_mail@mail.com'));

  useEffect(() => setExpanded(settings[name].enabled), [settings, name]);

  const togglePanel = async () => {
    try {
      await document.update({
        [`${name}.enabled`]: !expanded
      });
    } catch (err) {
      console.log(err);
      enqueueSnackbar('Error while updating settings', { variant: 'error' });
    }
  };

  return { expanded, togglePanel, settings, document };
}

export default usePanelExpanded;
