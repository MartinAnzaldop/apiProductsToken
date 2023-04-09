import Product from '../models/products'

export const createProducts= async (req, res)=>{
    const {name,category, price, imgURL}=req.body
    console.log(req.body)
    const newProduct= new Product({name,category,price,imgURL});
   const productSaved= await newProduct.save()
res.status(201).json(productSaved)
}

export const getProducts= async (req, res)=>{
    const products= await Product.find()
    res.json(products)

}

export const getProductsById= async(req, res)=>{
    const product=await Product.findById(req.params.productId)
    res.status(200).json(product)
}

export const updateProductsById= async(req, res)=>{
 const updateProduct= await Product.findByIdAndUpdate(req.params.productId, req.body,{
    new: true
})
    res.status(200).json(updateProduct);
}

export const deleteProductsById=async(req, res)=>{
  await Product.findByIdAndDelete(req.params.productId)
  res.status(200).json()
} 