class User {
    name:string
    age:number
    constructor(name:string,age:number){
        this.name = name
        this.age = age
    }


    sayHello(){
        console.log(`Hello student : ${this.name} : with age : ${this.age}`)
    }



}



const st1 = new User("Ibtissem",30)
const st2 = new User("Ibtissem",30)
const st3 = new User("Ibtissem",30)
const st4 = new User("Ibtissem",30)

console.log(st1)