import { randomUUID } from "crypto"

export class DatabaseMemory{
#sessões = new Map()

list(search){
    return Array.from(this.#sessões.entries()).map((sessõesArray) =>{
    // acessando primeira posição
        const id = sessõesArray[0]
        const data = sessõesArray[1]

        return{
            id,
            ...data
        }
    })
    .filter(sessão => {
        if (search){
            return sessão.nome.includes(search)
        }
        return true
    })
}
create(sessão){
    const sessãoId = randomUUID()
    this.#sessões.set(sessãoId, sessão)
}
update(id, sessão){
    this.#sessões.set(id, sessão)
}
delete(id, sessão){
    this.#sessões.delete(id, sessão)
}
}