
let myMiddleware = function(req, res, next){
    console.log('이곳을 거쳐갑니다.');
    next();
};

module.exports = myMiddleware;