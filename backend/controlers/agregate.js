const db = require("../config/keys");

const getMenuItem = async () => {
  const pipeline = [
    {
      $unwind: {
        path: "$sublinks",
      },
    },
    {
      $match: {
        $and: [
          {
            menuitemname: "Dashboard",
          },
          {
            "sublinks.sublinkid": 1,
          },
        ],
      },
    },
    {
      $project: {
        _id: 0,
        menuitemname: "$menuitemname",
        menuitemicon: "$menuitemicon",
        sublinkid: "$sublinks.sublinkid",
        sublinkicon: "$sublinks.sublinkicon",
        sublinkname: "$sublinks.sublinkname",
        sublinkurl: "$sublinks.sublinkurl",
      },
    },
  ];

  const result = db.collection("adminnavbar").aggregate(pipeline);
  result.next(function (err, res) {
    console.log(res);
  });
};
module.exports = getMenuItem;
