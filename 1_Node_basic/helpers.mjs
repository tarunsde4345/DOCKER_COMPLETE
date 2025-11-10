const connectToDatabase = () => {
    const dummyPromise = new Promise((resolve) => {
        setTimeout(() => {
            console.log('Connected to the database.');
            resolve();
        }, 1000);
    });
    return dummyPromise;
};

export default connectToDatabase;