import { Client, Account } from "appwrite";

export class AuthService{
    client = new Client()
    account

    constructor(){
        this.client
        .setEndpoint('https://cloud.appwrite.io/v1')
        .setProject('6730337b000f1414c354')
        this.account = new Account(this.client)
    }

    async createAccount({Id , useremail , userpassword , username}){
        
        console.log("Appwrite URL:", process.env.REACT_APP_APPWRITE_URL);
        console.log("Project ID:", process.env.REACT_APP_APPWRITE_PROJECT_ID);

        try {
            const account = await this.account.create(
                Id,
                useremail,
                userpassword,
                username
            )

            console.log("Account Created:", account);

            if (account){
                return this.login(useremail , userpassword)
            }
            else{
                return account
            }
        } catch (error) {
            console.log(`There is an error :: Create Account :: ${error}`)
            return null
        }
    }

    async login({email , password}){
        try {
            console.log(`email pass of authService.jsx ${email , password}`)
            const loginAccount = await this.account.createEmailPasswordSession(
                email,
                password
            )
            return loginAccount
        } catch (error) {
            console.log(`There is an error :: login Account :: ${error}`) 
            return null
        }
    }

    async getCurrentUser(){
        try {
            const currentUser = await this.account.get()
            return currentUser
        } catch (error) {
            console.log(`There is an error :: Getting Current Account :: ${error}`)
            return null
        }
    }

    async logout(){
        try {
            const deletedAccount = await this.account.deleteSessions()
            return deletedAccount
        } catch (error) {
            console.log(`There is an error :: logout Account :: ${error}`)
            return null
        }
    }
}

const authService = new AuthService()

export default authService