// $("#refresh_formed_battle_room").click(function(){
//     socket.emit('refreshFormedBattleRoom');
// });
$('#refresh_formed_battle_room').on('click', function(e){
    socket.emit('refreshFormedBattleRoom');
});