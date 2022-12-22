class productManager{
    constructor(){
        this.products= []
    }
    getProducts(){
        return console.log(this.products)
        }

    addProduct(title,description,price,thumbnail,stock,id){
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
            this.products.push(product)}
       
    }
}

   

       getProductById(idProduct){
            const productFound = this.#evaluarProductoId(idProduct)
           if(productFound){
              console.log(productFound)
            } else {
              console.log('Product not found')
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
  

product.getProducts()


product.addProduct('manzana', 'Este es el producto prueba', 200, 'sin imagen', 'abc123', 25)

product.getProducts()

product.addProduct(undefined, 'Este es el producto prueba', 200, 'sin imagen', 'abc123', 25)


product.getProductById(67)