let axios = require('axios');

const server = "http://server.topper144p.com:3000"
const AuthUrl = server + '/auth';
const LoginUrl = server + '/login';
const RegisterUrl = server + '/register';
const UpdateUrl = server + '/update';
const GetAllUsersUrl = server +'/admin/getAllUsers';
const ChangePrivilegeUrl = server + '/admin/changePrivilege/';
const UpdateUserURL = server + '/admin/updateUser';



export const AuthBody = async (jwt) => {
    let err, response = await axios.post(AuthUrl, null, { headers: { jwt: jwt }});
    
    if(err) throw err;

    return response.data;
}

export const LoginBody = async (body) => {
    let err, response = await axios.post(LoginUrl, body, null);
    
    if(err) throw err;

    return response.data;
}

export const RegisterBody = async (body, jwt) => {
    let err, response = await axios.post(RegisterUrl, body, { headers: { jwt: jwt }});

    if(err) throw err;

    return response.data;
}

export const UpdateBody = async (body, options) => {
    let err, response = await axios.post(UpdateUrl, body, options);

    if(err) throw err;

    return response.data;
}

export const GetAllUsersBody = async (jwt) =>{
    let err, response = await axios.get(GetAllUsersUrl, { headers: { jwt: jwt }});

    if(err) throw err;

    return response.data;
}

export const ChangePrivilegeBody = async(body, status, jwt) => {
    let err, response = await axios.post(ChangePrivilegeUrl + status, body, { headers: { jwt: jwt } });

    if(err) throw err;

    return response.data;
}

export const UpdateUserAdminBody = async (body, jwt) => {
    let err, response = await axios.post(UpdateUserURL, body, {headers:{jwt: jwt}});

    if(err) throw err;

    return response.data;
}

