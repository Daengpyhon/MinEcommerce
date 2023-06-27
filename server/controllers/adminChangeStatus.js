const UserOrder = require("../models/UserOrder");

exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId, orderStatus } = req.body;

    const orderUpdated = await UserOrder.findByIdAndUpdate(
      orderId,
      { orderStatus },
      { new: true }
    ).exec();
    res.status(200).send(orderUpdated);
  } catch (error) {
    console.log(error);
    res.status(500).send("ອັບເດັດສະຖານະການສັ່ງຊື້ລົ້ມເຫລວ!!");
  }
};
exports.deleteOrderStatus = async (req, res) => {
  try {
    await UserOrder.findOneAndDelete({ _id: req.params.id }).exec();
    res.status(200).send("ລົບສະຖານະການສັ່ງຊື້ສຳເລັດ");
  } catch (error) {
    console.log(error);
    res.status(500).send("ລົບສະຖານະການສັ່ງຊື້ລົ້ມເຫລວ!!");
  }
};
