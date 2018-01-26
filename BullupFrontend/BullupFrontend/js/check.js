$().ready(function () {
    $('.registration').on('click', function (e) {

        e.preventDefault();
        //报名中路由
        // bullup.loadTemplateIntoTarget('swig_signup.html', {}, 'main-view');
        var getsign = $(this).closest('#getsign-up');
        var data = $(getsign).find('#sign-up').text();
        userId=userInfo.userId;
        socket.emit('apply', {
            competitionid: data,
            userId:userId
        });

    });
    $('.underway').on('click', function (e) {

        e.preventDefault();
        //进行中路由
        bullup.loadTemplateIntoTarget('swig_playbyplay.html', {}, 'main-view');

        var getsign = $(this).closest('#getunderway');
        var data = $(getsign).find('#underway').text();

        socket.emit('underway', {

            competitionid: data
        })
    });
    $('.await').on('click', function (e) {

        e.preventDefault();
        //等待报名路由
        bullup.loadTemplateIntoTarget('swig_waittosignup.html', {}, 'main-view');
        var getsign = $(this).closest('#getawait');
        var data = $(getsign).find('#await').text();
        socket.emit('await', {

            competitionid: data
        })

    });
    $('.awaygame').on('click', function (e) {

        e.preventDefault();
        //等待比赛路由
        bullup.loadTemplateIntoTarget('swig_await.html', {}, 'main-view');

        var getsign = $(this).closest('#getawaygame');
        var data = $(getsign).find('#awaygame').text();

        socket.emit('awaygame', {

            competitionid: data
        })
    });
    $('.finish').on('click', function (e) {

        e.preventDefault();
        //已结束路由
        bullup.loadTemplateIntoTarget('swig_finished.html', {}, 'main-view');
        $.getScript('/js/createateam.js');
        var getsign = $(this).closest('#getfinish');
        var data = $(getsign).find('#finish').text();

        socket.emit('finish', {

            competitionid: data
        })
    });
    $('.personnelaudit').on('click', function (e) {

        e.preventDefault();
        //报名审核路由
        bullup.loadTemplateIntoTarget('swig_audit.html', {}, 'main-view');

        var getsign = $(this).closest('#getchecksign');
        var data = $(getsign).find('#checksign').text();

        socket.emit('checksign', {

            competitionid: data
        })
    });



})