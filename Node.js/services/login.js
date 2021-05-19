
const cosineSimilarity = (req, user) => {

    console.log('logged username');
    console.log(req.body.username);
    
    console.log('registered username');
    console.log(user.username);  

    
};

module.exports.cosineSimilarity = cosineSimilarity; 
