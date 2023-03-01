
const { createApp } = Vue
createApp({
    data() {
        return {
            tasks: [ 
                {desc: "feur", dateStart: "2022-22-000002", dateEnd: "2022-22-22", progress: "TODO", priority: "black"},
                {desc: "fd", dateStart: "2022-22-02", dateEnd: "2022-22-22", progress: "TODO", priority: "black"},
                {desc: "feee", dateStart: "2022-22-02", dateEnd: "2022-22-22", progress: "TODO", priority: "black"}
            ]
        }
    },
    methods: {
        addTask: function() {
            if(this.priority == "high"){
                this.priority = "🔴"
            } else if(this.priority == "medium"){
                this.priority = "🟠"
            } else {
                this.priority = "🟢"
            }
            this.tasks.push({desc: this.desc, dateStart:this.dateStart, dateEnd:this.dateEnd, progress:this.progress, priority:this.priority});
        },
        deleteAll: function(){
            this.tasks = {}
        }
        
    }
}).mount('.app')