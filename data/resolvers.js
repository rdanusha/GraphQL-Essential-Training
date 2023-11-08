import { resolve } from "path";
import { Widgets } from "./dbConnectors";
import { reject } from "lodash";
import { log } from "console";

export const resolvers = {
  getProduct: ({ id }) => {
    return new Promise((resolve) => {
      Widgets.findById({ _id: id })
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  },

  getAllProducts: () => {
    return Widgets.find({});
  },

  createProduct: ({ input }) => {
    const newWidget = new Widgets({
      name: input.name,
      description: input.description,
      price: input.price,
      soldout: input.soldout,
      inventory: input.inventory,
      stores: input.stores,
    });

    newWidget.id = newWidget._id;

    return new Promise((resolve) => {
      newWidget
        .save()
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },

  updateProduct: ({ input }) => {
    return new Promise((resolve) => {
      Widgets.findByIdAndUpdate({ _id: input.id }, input, { new: true })
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },

  deleteProduct: ({ id }) => {
    return new Promise((resolve) => {
      Widgets.deleteOne({ _id: id })
        .then((result) => {
          resolve("Successfuly deleted widget");
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },
};

export default resolvers;
