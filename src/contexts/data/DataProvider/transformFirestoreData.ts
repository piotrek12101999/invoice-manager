const dateFields: string[] = ['saleDate', 'issueDate', 'paymentDeadline', 'purchaseDate'];

export function transformFirestoreData(documents: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>[]) {
  const UNIX_TIMESTAMP: number = 1000;

  return documents.map((doc) => {
    const data = doc.data();

    dateFields.forEach((field) => {
      if (field in data && data[field] !== null) {
        data[field] = new Date(data[field].seconds * UNIX_TIMESTAMP);
      }
    });

    return { id: doc.id, ...data };
  });
}
