
const { createApp } = Vue
createApp({
    data() {
        return {
            tasks: [ 
                {id:1, desc: "feur", dateStart: "2022-22-000002", dateEnd: "2022-22-22", progress: "TODO", priority: "black", completed: true},
                {id:2, desc: "fd", dateStart: "2022-22-02", dateEnd: "2022-22-22", progress: "TODO", priority: "black", completed: false},
                {id:3, desc: "fegggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggge", dateStart: "2022-22-02", dateEnd: "2022-22-22", progress: "TODO", priority: "black", completed: true},
                {id:1, desc: "feur", dateStart: "2022-22-000002", dateEnd: "2022-22-22", progress: "TODO", priority: "black", completed: true},
                {id:1, desc: "feur", dateStart: "2022-22-000002", dateEnd: "2022-22-22", progress: "TODO", priority: "black", completed: true},
                {id:1, desc: "feur", dateStart: "2022-22-000002", dateEnd: "2022-22-22", progress: "TODO", priority: "black", completed: true},
                {id:1, desc: "feur", dateStart: "2022-22-000002", dateEnd: "2022-22-22", progress: "TODO", priority: "black", completed: true},
                {id:1, desc: "feur", dateStart: "2022-22-000002", dateEnd: "2022-22-22", progress: "TODO", priority: "black", completed: true},
                {id:1, desc: "feur", dateStart: "2022-22-000002", dateEnd: "2022-22-22", progress: "TODO", priority: "black", completed: true},
                {id:1, desc: "feur", dateStart: "2022-22-000002", dateEnd: "2022-22-22", progress: "TODO", priority: "black", completed: true},
                {id:1, desc: "feur", dateStart: "2022-22-000002", dateEnd: "2022-22-22", progress: "TODO", priority: "black", completed: true},
                {id:1, desc: "feur", dateStart: "2022-22-000002", dateEnd: "2022-22-22", progress: "TODO", priority: "black", completed: true}
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

            this.tasks.push({
                id:this.tasks.length + 1, 
                desc: this.desc, 
                dateStart:this.dateStart, 
                dateEnd:this.dateEnd, 
                progress:this.progress, 
                priority:this.priority, 
                completed:false
            });
        },
        deleteAll: function(){
            this.tasks = []
        },
        removeTask: function(index){
            this.tasks.splice(index, 1);
        },
        removeCompleted: function(){
            this.tasks = this.tasks.filter(this.inProgress);
        },
        getUnended(task) {
            return ! this.isCompleted(task);
        },
        isCompleted(task) {
            return task.completed;
        }



        
    }
}).mount('.app')
