const nodemailer = require("nodemailer");

// createUpdateQuery
module.exports.createUpdateQuery = async (tableName, condition, body) => {
  // Setup static beginning of query
  var query = ["UPDATE " + tableName];
  query.push("SET");

  // Create another array storing each set command
  // and assigning a number value for parameterized query
  var set = [];
  Object.keys(body).forEach(function (key, i) {
    set.push(key + " = ($" + (i + 1) + ")");
  });
  query.push(set.join(", "));

  // Add the WHERE statement to look up by id
  query.push(`WHERE ${condition}`);

  const colValues = Object.keys(body).map(function (key) {
    return body[key];
  });

  // Return a complete query string
  return {
    text: query.join(" ") + " RETURNING *",
    values: colValues,
  };
};

// createInsertQuery
module.exports.createInsertQuery = async (tableName, body) => {
  let insert = "insert into " + tableName;
  let keys = Object.keys(body);
  let dollar = keys.map(function (item, idx) {
    return "$" + (idx + 1);
  });
  let values = Object.keys(body).map(function (k) {
    return body[k];
  });
  return {
    text: insert + "(" + keys + ")" + " values(" + dollar + ") RETURNING *",
    values: values,
  };
};

// createInsertQuery
module.exports.createMultyInsertQuery = async (tableName, body) => {
  let columns = body[0].map((item) => {
    return `${item}`;
  });

  let arrayValue = [...body.slice(1)];

  let values = ``;

  arrayValue.map((item) => {
    if (item[0]) {
      values = values + "('" + item.join("','") + "'),";
    }
  });

  // arrayValue.map((item) => {
  //   if (item[0]) {
  //     values = values + `(${item}),`;
  //   }
  // });

  return `insert into ${tableName}(${columns}) VALUES ${values.slice(
    0,
    values.length - 1
  )} RETURNING *`;
};

// createFindQuery
module.exports.createFindQuery = async (tableName, body, limit = 10) => {
  let keys = Object.keys(body);
  let dollar = keys.map(function (item, idx) {
    return "$" + (idx + 1);
  });

  let where = keys.map(function (item, idx) {
    return item + " = " + "$" + (idx + 1);
  });

  let values = Object.keys(body).map(function (k) {
    return body[k];
  });
  let queryText = "SELECT * FROM " + tableName;
  return {
    text:
      queryText +
      " WHERE " +
      where +
      " ORDER BY created_at DESC" +
      " LIMIT " +
      limit,
    values: values,
  };
};

// Send OTP Mail
module.exports.sendOTPEmail = async ({ emailTo, subject, name, otp }) => {
  try {
    // Create Transporter
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      host: process.env.HOST,
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "codescroller@gmail.com", // generated ethereal user
        pass: "uxmdqxciskkgxrcc", // generated ethereal password
      },
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
      // from: process.env.EMAIL_FROM, // sender address
      from: '"Code Scroller" codescroller@gmail.com', // sender address
      to: emailTo, // list of receivers
      subject: subject, // Subject line
      // text: text, // plain text body
      html: `<div style='font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2'>
      <div style='margin:50px auto;width:70%;padding:20px 0'>
        <div style='border-bottom:1px solid #eee'>
          <a href='' style='font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600'>Code Scroller</a>
        </div>
        <p style='font-size:1.1em'>Hi, <b> ${name} </b> </p>
        <p>Your Account needs Verification. Use the following OTP to complete your Registration procedures. OTP is given below</p>
        <h2 style='background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;'>${otp}</h2>
        <p style='font-size:0.9em;'>Regards,<br />Code Scroller</p>
        <hr style='border:none;border-top:1px solid #eee' />
        <div style='float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300'>
          <p>Code Scroller</p>
          <p>Ford Company Chowk</p>
          <p>Purnia</p>
        </div>
      </div>
    </div>`, // html body
    });

    return info.messageId;
  } catch (error) {
    throw new Error("Something Went Wrong while sending the Email");
  }
};

// Generate OTP
module.exports.generateOTP = () => {
  return Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
};
