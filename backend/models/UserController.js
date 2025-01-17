// UserController.js

// 사용할 DB
const mysql = require('mysql2/promise');
const mysql2 = require('mysql2');

// DB config
const config = require('./config');

class UserController {
    static connection;
    static pool;
    constructor() {
        this.init();
    }
    // connect db
    async init() {
        try {
            this.pool = mysql.createPool(config, (err) => { if (err) throw err });
            this.connection = await this.pool.getConnection(async conn => conn);
        } catch (err) {
            throw err;
        } finally {
            this.connection.release();
        }
    }

    // 회원가입
    // userInfo : 객체타입
    async createUser(userInfo) {
        console.log("----------STRAT CREATEUSER()----------");
        this.connection = await this.pool.getConnection();
        const sql = 'insert into users set?';
        try {
            await this.connection.query(sql, userInfo);
            return true
        } catch (err) {
            throw err;
        } finally {
            this.connection.release();
        }
        
    }

    // 회원 중복 체크
    async checkUser(id) {
        console.log("----------START CHECKUSER()----------");
        this.connection = await this.pool.getConnection();
        const sql = "select id from users where id = " + "'" + id + "'";
        try {
            const [data] = await this.connection.query(sql);
            if (data.length) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            throw err;
        } finally {
            this.connection.release();
        }
    }

    // 로그인
    async login(id, pw) {
        console.log("----------START LOGIN()----------");
        this.connection = await this.pool.getConnection();
        const sql = "select id, password from users where id = " + "'" + id + "'" + ' and password = ' + "'" + pw + "'";
        try {
            const [data] = await this.connection.query(sql);
            if (data.length) {
                return true;            // 로그인 성공
            } else {
                return false;            // 로그인 실패
            }
        } catch (err) {
            throw err;
        } finally {
            this.connection.release();
        }
    }

    // getIngredients
    async getIngredients(id) {
        console.log("----------START GETINGREDIENTS()----------");
        let [data] = "";
        this.connection = await this.pool.getConnection();
        const sql = "select user_ingredient from user_ingredients where user_id = '" + id + "'";
        try {
            [data] = await this.connection.query(sql);
            
        } catch (err) {
            throw err;
        } finally {
            this.connection.release();
        }
        if ([data].length >= 1) {
            return data;
        } else {
            return {data: "false"};
        }
    }
}

exports.UserController = UserController;

