import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      name: "Abbosbek",
      email: "abek01sulaymonov@gmail.com",
      password: bcrypt.hashSync("12345678"),
      isAdmin: true,
    },
    {
      name: "Asliddin",
      email: "asliddin@gmail.com",
      password: bcrypt.hashSync("12345678"),
      isAdmin: false,
    },
    {
      name: "Asadbek",
      email: "asad01@gmail.com",
      password: bcrypt.hashSync("12345678"),
      isAdmin: false,
    },
  ],
  products: [
    {
      // _id: "1",
      name: "Nike Slim shirt",
      slug: "nike-slim-shirt",
      category: "Shirts",
      image:
        "https://images.pexels.com/photos/10376195/pexels-photo-10376195.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: 120,
      countInStock: 10,
      brand: "Nike",
      rating: 4.5,
      numReviews: 10,
      description: "high quality shirt",
    },
    {
      // _id: "2",
      name: "Adidas Fit Shirt",
      slug: "adidas-fit-shirt",
      category: "Shirts",
      image:
        "https://images.pexels.com/photos/1342609/pexels-photo-1342609.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: 250,
      countInStock: 20,
      brand: "Adidas",
      rating: 4.0,
      numReviews: 10,
      description: "high quality product",
    },
    {
      // _id: "3",
      name: "Nike Slim Pant",
      slug: "nike-slim-pant",
      category: "Pants",
      image:
        "https://images.pexels.com/photos/4936653/pexels-photo-4936653.jpeg?auto=compress&cs=tinysrgb&w=600",
      price: 25,
      countInStock: 15,
      brand: "Nike",
      rating: 4.5,
      numReviews: 14,
      description: "high quality product",
    },
    {
      // _id: "4",
      name: "Adidas Fit Pant",
      slug: "adidas-fit-pant",
      category: "Pants",
      image:
        "https://images.pexels.com/photos/1394892/pexels-photo-1394892.jpeg?auto=compress&cs=tinysrgb&w=600",
      price: 65,
      countInStock: 5,
      brand: "Puma",
      rating: 4.5,
      numReviews: 10,
      description: "high quality product",
    },
  ],
};
export default data;
