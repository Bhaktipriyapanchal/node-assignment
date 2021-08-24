const username = "Bhakti";
const password = "HmztXu7eS4axPcsq";
const cluster = "cluster0.5pbic";
const dbname = "assignment";
const dbConnectString = `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`;

export default dbConnectString;