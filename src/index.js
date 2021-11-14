/**
 * @description：index
 * @author: yujinxiong
 * @date: 2021-10-28 20:09
 */
import  './main.css';
import './sass.scss' // 引入 Sass 文件
import logo from '../public/avatar.png'

// 引入字体图标文件
import './fonts/iconfont.css'

const a = 'Hello ITEM'
console.log(a)

const img = new Image()
img.src = logo
document.getElementById('imgBox').appendChild(img)
// module.exports = a;

class Author {
    name = 'ITEM'
    age = 18
    email = '123@qq.com'

    info = () => {
        return {
            name: this.name,
            age: this.age,
            email: this.email
        }
    }
}

module.exports = Author

// 新增装饰器的使用
@log('hi')
class MyClass {}

function log(text) {
    return function (target) {
        target.prototype.logger = () => `${text}, ${target.name}`
    }
}

const test = new MyClass()
test.logger()