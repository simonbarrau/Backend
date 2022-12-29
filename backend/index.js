const fs = require('fs')
const { title } = require('process')


class productManager{
    constructor(){
        this.products= []
        this.path = './archivos/products.json'

    }


    async getProducts(){
        try{
            if(fs.existsSync(this.path)){
              const infoProducts = await fs.promises.readFile(this.path, 'utf-8')
              const infoProductsJS = JSON.parse(infoProducts)
              return console.log(infoProductsJS)
            } else {
              return []
            }
          } catch(error){
            console.log(error)
          }
        }

    async addProduct(title,description,price,thumbnail,stock,id){
        if (!title|| !description || !price || !thumbnail || !stock || !id) {
            console.log("Complete todos los campos y vuelva a intentar");   
        }else{
            const isCode= this.#hayCode()
            if(isCode){
                console.log("Ese codigo ya existe!");
            } else{
                 const product = {
                code:this.#generarCode(),
                title,
                description,
                price,
                thumbnail,
                stock
            }
            this.products.push(product)
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2))}
       
    }
}

   

       async getProductById(idProducto){
        try {
            if (fs.existsSync(this.path)){
              await fs.promises.readFile(this.path, 'utf-8')
              const encontrarProducto = this.#evaluarProductoId(idProducto)
              if(encontrarProducto){
                console.log(encontrarProducto)
                return encontrarProducto
              } else {
                console.log('No se encontro el producto! Intente de nuevo!')
              }
            }
          } catch(error) {
            console.log(error)
          }
          }

          async subirProducto(idProducto, change){
            let read = await fs.promises.readFile(this.path, 'utf-8')
            read = JSON.parse(read)
            let product = await this.getProductById(idProducto)
            if(product){
              product = {...product, ...change}
              read = read.map(prod => {
                if(prod.id == product.id){
                  prod = product
                }
                return prod
              })
              read = JSON.stringify(read, null, 2)
              await fs.promises.writeFile(this.path, read)
              console.log(JSON.parse(read))
              return read
            }else{
              return null
            }
          }

          async borrarProducto(idProducto){
            let read = await fs.promises.readFile(this.path, 'utf-8')
            read = JSON.parse(read)
            let producto = await this.getProductById(idProducto)
            if(producto){
              const filtrado =read.filter(prod => prod.id != idProducto)
              await fs.promises.writeFile(this.path, JSON.stringify(filtrado, null, 2))
              return filtrado
            }
          }
        

          #evaluarProductoId(id){
            return this.products.find(product => product.id === id)
          }

    #generarCode(){
        const code= this.products.length === 0 ? 1 : this.products[ this.products.length - 1].code + 1
        return code
    }

    #hayCode(code){
        return this.products.find(product => product.code === code)
    }

}

const product = new productManager()
  




product.subirProducto(2, {"title":'prueba cambiada'})