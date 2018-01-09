$('#delete_friends').on('click', function () {
    var friendlist = Number.parseInt($("#friend_list_size_hidden").val());
    for(var i=0;i<friendlist;i++){
        if($("#friend_" + (i+1) + "_check_box").prop("checked")){
           // alert($("#friend_" + (i+1) + "_check_box").val());//打印选中的值
            var friend = userInfo.friendList[i];
            socket.emit("delete_friends",{
                userId:userInfo.userId,
                friend_userId:friend.userId
            });
        }
    }     
});
