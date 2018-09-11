!function () {

    var view = document.querySelector('section.message');

    var model = Model({ resourceName: 'Message' });

    var controller = Controller({
        messageList: null,
        form: null,
        init: function (view, controller) {
            this.messageList = view.querySelector('#messageList');
            this.form = view.querySelector('#postMessageForm');

            this.loadMessages();
        },
        loadMessages: function () {
            this.model.fetch().then(messages => {

                let array = messages.map(item => item.attributes);

                array.forEach(item => {
                    let li = document.createElement('li');
                    li.innerText = item.name + '的留言: ' + item.content;

                    this.messageList.appendChild(li);
                });
            }, function (error) {
                alert("提交失败");
            });
        },
        bindEvents: function () {
            this.form.addEventListener('submit', e => {
                e.preventDefault();
                this.saveMessage();
            });
        },
        saveMessage: function () {
            let myForm = this.form;
            let content = myForm.querySelector('input[name=content]').value;
            let name = myForm.querySelector('input[name=name]').value;
            this.model.save({ name: name, content: content }).then(function (object) {
                console.log('存入成功');
                console.log(object);
                let li = document.createElement('li');
                messageList.appendChild(li);
                li.innerText = object.attributes.name + ':' + object.attributes.content;
                myForm.querySelector('input[name=content]').value = '';
                myForm.querySelector('input[name=name]').value = '';
            });
        }
    });

    controller.init(view, model);
}.call();