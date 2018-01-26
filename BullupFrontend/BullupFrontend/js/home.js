var KanbanTest = new Kanban({
        element : '#myKanban',
        gutter  : '10px',
        click : function(el){
            alert(el.innerHTML);
        },
        boards  :[
            {
                'id' : '_todo',
                'title'  : 'To Do (drag me)',
                'class' : 'info',
                'item'  : [
                    {
                        'title':'Try drag me',
                    },
                    {
                        'title':'Click me!!',
                    }
                ]
            },
            {
                'id' : '_working',
                'title'  : 'Working',
                'class' : 'warning',
                'item'  : [
                    {
                        'title':'Do Something!',
                    },
                    {
                        'title':'Run?',
                    }
                ]
            },
            {
                'id' : '_done',
                'title'  : 'Done',
                'class' : 'success',
                'item'  : [
                    {
                        'title':'All right',
                    },
                    {
                        'title':'Ok!',
                    }
                ]
            }
        ]
    });

    var toDoButton = document.getElementById('addToDo');
    toDoButton.addEventListener('click',function(){
        KanbanTest.addElement(
            '_todo',
            {
                'title':'Test Add',
            }
        );
    });

    var addBoardDefault = document.getElementById('addDefault');
    addBoardDefault.addEventListener('click', function () {
        KanbanTest.addBoards(
            [{
                'id' : '_default',
                'title'  : 'Kanban Default',
                'class' : 'error',
                'item'  : [
                    {
                        'title':'Default Item',
                    },
                    {
                        'title':'Default Item 2',
                    },
                    {
                        'title':'Default Item 3',
                    }
                ]
            }]
        )
    });

    var removeBoard = document.getElementById('removeBoard');
    removeBoard.addEventListener('click',function(){
        KanbanTest.removeBoard('_done');
    });
