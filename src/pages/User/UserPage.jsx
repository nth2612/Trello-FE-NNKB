import avt from '~/images/myavt5.png'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AddIcon from '@mui/icons-material/Add'

const mockData = [
  {
    id: 1,
    nameboard: 'aaaa'
  },
  {
    id: 2,
    nameboard: 'bbbb'
  },
  {
    id: 3,
    nameboard: 'dddd'
  },
  {
    id: 4,
    nameboard: 'cccc'
  },
  {
    id: 5,
    nameboard: 'eeee'
  }
]

const UserPage = () => {
  return (
    <div className='max-w-[600px] mx-auto'>
      <h1 className='text-4xl'>Chào mừng quay trở lại !</h1>
      <div className='rounded-full overflow-hidden aspect-square w-40'>
        <img src={avt} alt="" />
      </div>
      <span>Nhấn vào đây để thay đổi ảnh đại diện</span>
      <input type="file" />
      <div>
        <DashboardIcon fontSize='large' />
        <span className='ml-3 text-xl'>Bảng làm việc của bạn:</span>
      </div>
      <div className='space-y-2'>
        {mockData.map(b => (
          <div key={b.id} className='w-56 h-20 bg-green-500 hover:bg-green-600'>
            <a href="/board" className='block h-full'>
              <p className='font-extrabold text-white'>{b.nameboard}</p>
            </a>
          </div>
        ))}
        <div>
          <AddIcon/>
          Create new board</div>
      </div>
    </div>
  )
}

export default UserPage
