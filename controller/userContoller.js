import request from "request";
import axios from "axios";
import admin from "firebase-admin";
import path from 'path'

function xendit_api_test_mode(url, data) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data, {
        headers: {
          Authorization: "",
        },
      })
      .then((result) => {
        resolve(result.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function xendit_api(url, data) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data, {
        headers: {
          Authorization: "",
          "api-version": ""
        },
      })
      .then((result) => {
        resolve(result.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export async function getCost(req, res) {
  var options = {
    method: "POST",
    url: "https://api.rajaongkir.com/starter/cost",
    headers: {
      key: "",
      "content-type": "application/x-www-form-urlencoded",
    },
    form: {
      origin: req.params.dari,
      destination: req.params.ke,
      weight: req.params.berat,
      courier: req.params.kurir,
    },
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    res.send(body);
  });
}

export async function getKota(req, res) {
  var options = {
    method: "GET",
    url: "https://api.rajaongkir.com/starter/city",
    qs: { id: "", province: req.params.provinsi },
    headers: { key: "" },
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    res.send(body);
  });
}

export async function getProvinsi(req, res) {
  var options = {
    method: "GET",
    url: "https://api.rajaongkir.com/starter/province",
    qs: { id: "" },
    headers: { key: "" },
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    res.send(body);
  });
}

export async function successRedirectUrl(req, res) {
  const __dirname = path.resolve();
  res.sendFile(path.join(__dirname, '/html', 'success.html'));
}

export async function failedRedirectUrl(req, res) {
  const __dirname = path.resolve();
  res.sendFile(path.join(__dirname, '/html', 'failed.html'));
}

export async function createEwalletCharge(req, res) {
  const { id, total, metode } = req.body;

  xendit_api("https://api.xendit.co/ewallets/charges", {
    
  })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
}

export async function ewallet_payment_success_callback(req, res) {
  const { reference_id } = req.body.data;

  const store = admin.firestore();
  const database = store.collection("pemesanan").doc(reference_id);
  database
    .update({ status: "bayar" })
    .then(() => {
      res.status(200).send("success");
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

export async function create_virtual_banking_charge(req, res) {
  const { id, bank_code, name } = req.body;

  xendit_api("https://api.xendit.co/callback_virtual_accounts", {
    
  })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

export async function simulate_virtual_banking_payment(req, res) {
  const { id, transfer_amount } = req.body;

  xendit_api(`https://api.xendit.co/callback_virtual_accounts/external_id=${id}/simulate_payment `, {
    "amount": transfer_amount
  })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

export async function virtual_banking_payment_success_callback(req, res) {
  const { external_id } = req.body;

  const store = admin.firestore();
  const database = store.collection("pemesanan").doc(external_id);
  database
    .update({ status: "bayar" })
    .then(() => {
      res.status(200).send("success");
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

export async function virtual_banking_payment_expired_callback(req, res) {
  const { external_id } = req.body;

  const store = admin.firestore();
  const database = store.collection("pemesanan").doc(external_id);
  database
    .update({ status: "expired" })
    .then(() => {
      res.status(200).send("success");
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

export async function create_qrcode(req, res) {
  const { id, total } = req.body;
  xendit_api("https://api.xendit.co/qr_codes", {
    
  })
    .then((result) => {
      res.status(200).send(result)
      console.log(result);
    })
    .catch((err) => {
      res.status(500).send(err)
      console.log(err.response.data);
    })
}


export async function qrcode_payment_success(req, res) {
  const { reference_id } = req.body.data;

  const store = admin.firestore();
  const database = store.collection("pemesanan").doc(reference_id);
  database
    .update({ status: "bayar" })
    .then(() => {
      res.status(200).send("success");
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}