! function() {
    var view = document.querySelector('section.message')
    var controller = {
        view: null,
        messageList: null,
        form: null,
        init: function(view) {
            this.view = view
            this.messageList = view.querySelector('#messageList')
            this.form = view.querySelector('#postMessageForm')
            this.initAV()
            this.loadMessages()
            this.bindEvents()
        },
        initAV: function() {
            var APP_ID = 'ySmdY9GX63D3F15CMFaOnPc7-gzGzoHsz';
            var APP_KEY = 'tP6AYDHargVJmsN7MmoMvlcx';

            AV.init({
                appId: APP_ID,
                appKey: APP_KEY
            });
        },
        loadMessages: function() {
            var query = new AV.Query('Message');
            query.find().then((messages) => {

                let array = messages.map((item) => item.attributes)

                array.forEach((item) => {
                    let li = document.createElement('li')
                    li.innerText = item.name + '的留言: ' + item.content

                    this.messageList.appendChild(li)

                });
            }, function(error) {
                alert("提交失败")
            });
        },
        bindEvents: function() {

            this.form.addEventListener('submit', function(e) {
                e.preventDefault()

            })
        },
        x: function() {
            let myForm = this.form
            let content = myForm.querySelector('input[name=content]').value
            let name = myForm.querySelector('input[name=name]').value
            var Message = AV.Object.extend('Message');
            var message = new Message();
            message.save({
                name: name,
                content: content
            }).then(function(object) {
                console.log('存入成功')
                console.log(object)
                let li = document.createElement('li')
                messageList.appendChild(li)
                li.innerText = object.attributes.name + ':' + object.attributes.content
                myForm.querySelector('input[name=content]').value = ''
                myForm.querySelector('input[name=name]').value = ''
            })
        }
    }













}.call()