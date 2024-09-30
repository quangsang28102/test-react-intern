import { Container } from 'react-bootstrap';
import './Home.scss'


const Home = () => {
    return (
        <>
            <Container className='container'>
                <div>
                    Yêu cầu:
                </div>
                <div>
                    Sử dụng API từ trang web <a href="https://reqres.in/">https://reqres.in/</a> để tạo một website.
                </div>
                <div>
                    SỬ dụng thư viện React tạo website với các chức năng cơ bản
                    <ul>
                        <li>1. Đăng nhập</li>
                        <li>2. Thêm User</li>
                        <li>3. Sửa User</li>
                        <li>4. Xóa User</li>
                        <li>5. Hiển thị tất cả các User</li>
                        <li>6. Tìm kiếm User theo email</li>
                        <li>7. Sắp xếp theo First Name</li>
                        <li>8. Import User từ file .csv</li>
                        <li>9. Export User ra file .csv</li>
                    </ul>
                </div>
                <div>
                    Tự do tùy chỉnh html, css để có một giao diện nhẹ nhàng, khoa học, đẹp.
                </div>
            </Container>
        </>)
}
export default Home;