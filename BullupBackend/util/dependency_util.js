var pathUtil = require("./path_util.js");

exports.init = function(rootPath){
    pathUtil.init(rootPath);

    this.global = {};
    this.global.service = {};
    this.global.utils = {};
    this.global.listener = {};
    this.global.dao = {};
    
    this.global.dao.baseInfoDao = require(pathUtil.paths.daoPaths.baseInfoDaoPath);
    this.global.dao.wealthInfoDao = require(pathUtil.paths.daoPaths.wealthInfoDaoPath);
    this.global.dao.rankInfoDao = require(pathUtil.paths.daoPaths.rankInfoDaoPath);
    this.global.dao.battleRecordDao = require(pathUtil.paths.daoPaths.battleRecordDaoPath);
    this.global.dao.lolInfoDao = require(pathUtil.paths.daoPaths.lolInfoDaoPath);
    this.global.dao.strengthInfoDao = require(pathUtil.paths.daoPaths.strengthInfoDaoPath);
    this.global.dao.administratorDao = require(pathUtil.paths.daoPaths.administratorDaoPath);
    this.global.dao.bullupWebDao = require(pathUtil.paths.daoPaths.bullupWebDaoPath);
    this.global.dao.pubgDao = require(pathUtil.paths.daoPaths.pubgDaoPath);

    this.global.service.userService = require(pathUtil.paths.servicePaths.userServicePath);
    this.global.service.battleService = require(pathUtil.paths.servicePaths.battleServicePath);
    this.global.service.chatService = require( pathUtil.paths.servicePaths.chatServicePath);
    this.global.service.administratorService = require(pathUtil.paths.servicePaths.administratorServicePath);
    this.global.service.competitonService = require(pathUtil.paths.servicePaths.competitonServicePath);
    this.global.service.feedbackService = require(pathUtil.paths.servicePaths.feedbackServicePath);
    this.global.service.lolKeyService = require(pathUtil.paths.servicePaths.lolKeyServicePath);
    this.global.service.matchService = require( pathUtil.paths.servicePaths.matchServicePath);
    this.global.service.paymentService = require(pathUtil.paths.servicePaths.paymentServicePath);
    this.global.service.socketService = require(pathUtil.paths.servicePaths.socketServicePath);
    this.global.service.stripeService = require(pathUtil.paths.servicePaths.stripeServicePath);
    this.global.service.teamService = require(pathUtil.paths.servicePaths.teamServicePath);
    this.global.service.testService = require(pathUtil.paths.servicePaths.testServicePath);
    this.global.service.bullupWebService = require(pathUtil.paths.servicePaths.bullupWebServicePath);
    this.global.service.pubgService = require(pathUtil.paths.servicePaths.pubgServicePath);
    

    this.global.utils.databaseUtil = require(pathUtil.paths.utilPaths.databaseUtilPath);
    this.global.utils.pathUtil = pathUtil;
    //this.global.utils.dependencyUtil = require(pathUtil.paths.utilPaths.dependencyUtilPath);
    this.global.utils.logUtil = require(pathUtil.paths.utilPaths.logUtilPath);
    this.global.utils.lolUtil = require(pathUtil.paths.utilPaths.lolUtilPath);

    this.global.listener.connectionListener = require(pathUtil.paths.listenerPaths.connectionListenerPath);
    this.global.listener.userListener = require(pathUtil.paths.listenerPaths.userListenerPath);
    this.global.listener.battleListener = require(pathUtil.paths.listenerPaths.battleListenerPath);
    this.global.listener.chatListener = require(pathUtil.paths.listenerPaths.chatListenerPath);
    this.global.listener.administratorListener = require(pathUtil.paths.listenerPaths.administratorListenerPath);
    this.global.listener.competitionListener = require(pathUtil.paths.listenerPaths.competitionListenerPath);
    this.global.listener.feedbackListener = require(pathUtil.paths.listenerPaths.feedbackListenerPath);
    this.global.listener.lolkeyListener = require(pathUtil.paths.listenerPaths.lolKeyListenerPath);
    this.global.listener.matchListener = require(pathUtil.paths.listenerPaths.matchListenerPath);
    this.global.listener.paymentListener = require(pathUtil.paths.listenerPaths.paymentListenerPath);
    this.global.listener.socketListener = require(pathUtil.paths.listenerPaths.socketListenerPath);
    this.global.listener.stripeListener = require(pathUtil.paths.listenerPaths.stripeListenerPath);
    this.global.listener.teamListener = require(pathUtil.paths.listenerPaths.teamListenerPath);

}



