$(function() {
    // 设置参数
    $('body').pagewalkthrough({
        name: 'introduction',
        steps: [{
                popup: { //定义弹出提示引导层
                    content: '开启界面引导',
                    type: 'modal'
                }
            }, {
                wrapper: '.dro-index',//当前引导对应的元素位置
                popup: {
                    content: '.w1',//关联的内容元素
                    type: 'tooltip',//弹出方式（tooltip和modal以及nohighlight）
                    position: 'bottom',//弹出层位置（top,left, right or bottom）
                    width:'200'	
                }
            }, {
                wrapper: '#yuezhan',
                popup: {
                    content: '#walkthrough-3',
                    type: 'tooltip',
                    position: 'bottom',
                    top: '505px',
                    left: '368.406'

                }
            }, {
                wrapper: '#starter-chatroom-btn',
                popup: {
                    content: '#walkthrough-7',
                    type: 'tooltip',
                    position: 'bottom',
                    top: '505px',
                    left: '368.406'

                }
            }, {
                wrapper: '#router_personal_center',
                popup: {
                    content: '#walkthrough-4',
                    type: 'tooltip',
                    position: 'bottom'
                }
            }, {
                wrapper: '.fa-plus',
                popup: {
                    content: '#walkthrough-5',
                    type: 'tooltip',
                    position: 'left'
                }
            }]
    });

    // 一步一步显示引导页
    //$('body').pagewalkthrough('show');
});