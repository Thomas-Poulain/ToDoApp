
const { createApp } = Vue
createApp({
    data() {
        return {
            tasks: [],
            priority:"Low priority",
            progress: "TODO",
            progressFilter : "",
            priorityFilter : "",
            dateFilter: "",
            keywordFilter: ""
        }
    },
    computed: {
        filters() {

            if(this.progressFilter != ""){
                if(this.priorityFilter!= ""){
                    if(this.dateFilter != ""){
                        if(this.keywordFilter != ""){
                            return this.tasks.filter(task => (task.progress == this.progressFilter) 
                            && (task.priority == this.priorityFilter)
                            && ( (task.dateEnd == this.dateFilter) || (task.dateStart == this.dateFilter))
                            && (task.desc.includes(this.keywordFilter)))    
                        }
                        return this.tasks.filter(task => (task.progress == this.progressFilter) 
                            && (task.priority == this.priorityFilter)
                            && ( (task.dateEnd == this.dateFilter) || (task.dateStart == this.dateFilter)))
                    }
                    return this.tasks.filter(task => (task.progress == this.progressFilter) 
                        && (task.priority == this.priorityFilter))
                }
                return this.tasks.filter(task => task.progress == this.progressFilter)
            }

            if(this.priorityFilter!= ""){
                if(this.dateFilter != ""){
                    if(this.keywordFilter != ""){
                        return this.tasks.filter(task => (task.priority == this.priorityFilter)
                        && ( (task.dateEnd == this.dateFilter) || (task.dateStart == this.dateFilter))
                        && (task.desc.includes(this.keywordFilter)))    
                    }
                    return this.tasks.filter(task => (task.priority == this.priorityFilter)
                        && ( (task.dateEnd == this.dateFilter) || (task.dateStart == this.dateFilter)))
                }
                return this.tasks.filter(task => (task.priority == this.priorityFilter))
            }

            if(this.dateFilter != ""){
                if(this.keywordFilter != ""){
                    return this.tasks.filter(task => ((task.dateEnd == this.dateFilter) || (task.dateStart == this.dateFilter))
                    && (task.desc.includes(this.keywordFilter)))    
                }
                return this.tasks.filter(task => ((task.dateEnd == this.dateFilter) || (task.dateStart == this.dateFilter)))
            }

            if(this.keywordFilter != ""){
                return this.tasks.filter(task => (task.desc.includes(this.keywordFilter)))    
            }

            return this.tasks
        }
    },
    methods: {
        addTask: function() {
            this.tasks.push({
                id:this.tasks.length + 1, 
                desc: this.desc, 
                dateStart:this.format(this.dateStart), 
                dateEnd:this.format(this.dateEnd), 
                progress:this.progress, 
                priority:this.priority, 
                completed:false
            });
        },
        format: function (inputDate) {
            var date = new Date(inputDate);
            if (!isNaN(date.getTime())) {
                // Months use 0 index.
                console.log(date.getTime())
                return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
            }
        },
        chgPriorityColor: function(task){
            return {
                'badge badge-danger ml-2': task.priority == "High priority",
                'badge badge-warning ml-2': task.priority == "Medium priority",
                'badge badge-success ml-2': task.priority == "Low priority"
            }
        },
        togglePriority: function(task){
            if(task.priority == "Low priority"){
                task.priority = "Medium priority"
            }else if(task.priority == "Medium priority"){
                task.priority = "High priority"
            } else {
                task.priority = "Low priority"
            }
        },
        chgProgressColor: function(task){
            return {
                'todo-indicator bg-warning': task.progress == "In progress",
                'todo-indicator bg-success': task.progress == "Closed",
                'todo-indicator bg-danger': task.progress == "TODO"
            }
        },
        toggleProgress: function(task){
            if(task.progress == "TODO"){
                task.progress = "In progress"
                task.completed = false
            }else if(task.progress == "In progress"){
                task.progress = "Closed"
                task.completed = true
            } else {
                task.progress = "TODO"
                task.completed = false
            }
        },
        deleteAll: function(){
            this.tasks = []
        },
        removeTask: function(task){
            this.tasks = this.tasks.filter(t => t.id != task.id)
            //this.tasks.splice(task);
        },

        //is subdivided in smaller functions 
        removeCompleted: function(){
            this.tasks = this.tasks.filter(this.getUnended);
        },
        //searches for every on going tasks
        getUnended(task) {
            return ! this.isCompleted(task);
        },
        //return if the current taks is completed or not
        isCompleted(task) {
            return task.completed;
        } 
    }, 
    //Watch will keep an eye over the tasks array, and will log in the local storage every changes.
    watch: {
        tasks: {
            handler() {
                console.log('Tasks array changed!');
                localStorage.setItem('tasks', JSON.stringify(this.tasks));
            },
            deep: true,
        },
    },
    //is called each time the app is mounted, check if something is saved in local and readd it to the tasks if yes
    mounted(){
        console.log('App Mounted');
            if (localStorage.getItem('tasks')) 
                this.tasks = JSON.parse(localStorage.getItem('tasks'));
    }
}).mount('.app')

