import admin from 'firebase-admin';

export function hello(req, res) {
    res.send('hello');
}

export async function createAdmin(req, res) {
    try {
        const { email, username, hakAkses, password } = req.body;

        if (!email || !username || !password) {
            return res.status(400).send("terdapat field yang belum di isi");
        }

        const { uid } = await admin.auth().createUser({
            displayName: username,
            password: password,
            email: email
        })

        if (hakAkses == 'Super Admin') {
            await admin.auth().setCustomUserClaims(uid, { admin: true });
        }

        return res.status(200).send(uid);
    } catch (err) {
        res.status(500).send(`${err.code} - ${err.message}`);
    }
}

export async function delAdmin(req, res) {
    try {
        await admin.auth().deleteUser(req.params.id);
        return res.status(200).send("deleted");
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getUserData(req, res) {
    try {
        const userData = await admin.auth().getUser(req.params.id);
        return res.status(200).send(userData);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function updateAdmin(req, res) {
    try {
        const { username, email, hakAkses, password, noTelp } = req.body;
        await admin.auth().updateUser(req.params.id, {
            displayName: username,
            email: email,
            phoneNumber: `+62${noTelp}`,
        }).then(async () => {
            if (password != null) {
                await admin.auth().updateUser(req.params.id, {
                    password: password,
                })
            }
            await admin.auth().getUser(req.params.id).then((result) => {
                if (hakAkses == "Super Admin") {
                    result.customClaims["admin"];
                } else {
                    result.customClaims[null];
                }
            })
        })

        return res.status(200).send("updated");
    } catch (err) {
        res.status(500).send(err.message);
    }
}
