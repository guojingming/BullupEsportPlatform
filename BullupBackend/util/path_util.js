exports.init = function(rootPath){
    //文件目录路径对象
    exports.directories = {};
    //存放数据库相关操作
    exports.directories.daoDirectory = rootPath + "/dao/";
    //存放一些独立的txt文件等
    exports.directories.otherDirectory = rootPath + "/other/";
    //存放监听器层的文件
    exports.directories.listenserDirectory = rootPath + "/listener/";
    //存放服务层的文件
    exports.directories.serviceDirectory = rootPath + "/service/";
    //存放工具类的文件
    exports.directories.utilDirectory = rootPath + "/util/";
    //根目录
    exports.directories.rootDirectory = rootPath;

    //文件路径对象
    exports.paths = {};
    exports.paths.daoPaths = {};
    exports.paths.servicePaths = {};
    exports.paths.utilPaths = {};
    exports.paths.listenerPaths = {};
    exports.paths.utilPaths = {};
    exports.paths.otherPaths = {};
    //Dao路径
    exports.paths.daoPaths.baseInfoDaoPath = exports.directories.daoDirectory + "base_info_dao.js";
    exports.paths.daoPaths.wealthInfoDaoPath = exports.directories.daoDirectory + "wealth_info_dao.js";
    exports.paths.daoPaths.rankInfoDaoPath = exports.directories.daoDirectory + "rank_info_dao.js";
    exports.paths.daoPaths.battleRecordDaoPath = exports.directories.daoDirectory + "battle_record_dao.js";
    exports.paths.daoPaths.lolInfoDaoPath = exports.directories.daoDirectory + "lol_info_dao.js";
    exports.paths.daoPaths.strengthInfoDaoPath = exports.directories.daoDirectory + "strength_info_dao.js";
    exports.paths.daoPaths.administratorDaoPath = exports.directories.daoDirectory + "administrator_dao.js";
    exports.paths.daoPaths.bullupWebDaoPath = exports.directories.daoDirectory + "bullup_web_dao.js";
    exports.paths.daoPaths.pubgDaoPath = exports.directories.daoDirectory + "pubg_dao.js";
    //Service路径
    exports.paths.servicePaths.userServicePath = exports.directories.serviceDirectory + "user_service.js";
    exports.paths.servicePaths.battleServicePath = exports.directories.serviceDirectory + "battle_service.js";
    exports.paths.servicePaths.chatServicePath = exports.directories.serviceDirectory + "chat_service.js";
    exports.paths.servicePaths.administratorServicePath = exports.directories.serviceDirectory + "administrator_service.js";
    exports.paths.servicePaths.competitonServicePath = exports.directories.serviceDirectory + "competiton_service.js";
    exports.paths.servicePaths.feedbackServicePath = exports.directories.serviceDirectory + "feedback_service.js";
    exports.paths.servicePaths.lolKeyServicePath = exports.directories.serviceDirectory + "lolkey_service.js";
    exports.paths.servicePaths.matchServicePath = exports.directories.serviceDirectory + "match_service.js";
    exports.paths.servicePaths.paymentServicePath = exports.directories.serviceDirectory + "payment_service.js";
    exports.paths.servicePaths.socketServicePath = exports.directories.serviceDirectory + "socket_service.js";
    exports.paths.servicePaths.stripeServicePath = exports.directories.serviceDirectory + "stripe_service.js";
    exports.paths.servicePaths.teamServicePath = exports.directories.serviceDirectory + "team_service.js";
    exports.paths.servicePaths.testServicePath = exports.directories.serviceDirectory + "test_service.js";
    exports.paths.servicePaths.bullupWebServicePath = exports.directories.serviceDirectory + "bullupWeb_service.js";    
    exports.paths.servicePaths.pubgServicePath = exports.directories.serviceDirectory + "pubg_service.js";
    //Util路径
    exports.paths.utilPaths.databaseUtilPath = exports.directories.utilDirectory + "database_util.js";
    exports.paths.utilPaths.pathUtilPath = exports.directories.utilDirectory + "path_util.js";
    exports.paths.utilPaths.dependencyUtilPath = exports.directories.utilDirectory + "dependency_util.js";
    exports.paths.utilPaths.logUtilPath = exports.directories.utilDirectory + "log_util.js";
    exports.paths.utilPaths.lolUtilPath = exports.directories.utilDirectory + "lol_util.js";
    //listener路径
    //主监听器
    exports.paths.listenerPaths.connectionListenerPath = exports.directories.listenserDirectory + "connection_listener.js";
    //具体服务的监听器
    exports.paths.listenerPaths.userListenerPath = exports.directories.listenserDirectory + "user_listener.js";
    exports.paths.listenerPaths.battleListenerPath = exports.directories.listenserDirectory + "battle_listener.js";
    exports.paths.listenerPaths.chatListenerPath = exports.directories.listenserDirectory + "chat_listener.js";
    exports.paths.listenerPaths.administratorListenerPath = exports.directories.listenserDirectory + "administrator_listener.js";
    exports.paths.listenerPaths.competitionListenerPath = exports.directories.listenserDirectory + "competition_listener.js";
    exports.paths.listenerPaths.feedbackListenerPath = exports.directories.listenserDirectory + "feedback_listener.js";
    exports.paths.listenerPaths.lolKeyListenerPath = exports.directories.listenserDirectory + "lolkey_listener.js";
    exports.paths.listenerPaths.matchListenerPath = exports.directories.listenserDirectory + "match_listener.js";
    exports.paths.listenerPaths.paymentListenerPath = exports.directories.listenserDirectory + "payment_listener.js";
    exports.paths.listenerPaths.socketListenerPath = exports.directories.listenserDirectory + "socket_listener.js";
    exports.paths.listenerPaths.stripeListenerPath = exports.directories.listenserDirectory + "stripe_listener.js";
    exports.paths.listenerPaths.teamListenerPath = exports.directories.listenserDirectory + "team_listener.js";
    //other files路径
    //存放一些杂文件
    exports.paths.otherPaths.lolKeyTextPath = exports.directories.otherDirectory + "key.txt";

}