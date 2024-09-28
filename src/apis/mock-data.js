export const mockData = {
  board : {
    _id : 'board-id-02',
    title: 'Ngọt',
    columnOrderIds: ['column-id-01', 'column-id-02', 'column-id-03', 'column-id-04'],
    type: 'public',
    columns: [
      {
        _id: 'column-id-01',
        boardId: 'board-id-02',
        title: 'Skills',
        cardOrderIds: ['card-id-01', 'card-id-05', 'card-id-04', 'card-id-02', 'card-id-07', 'card-id-06', 'card-id-03'],
        card: [
          { _id: 'card-id-01', boardId: 'board-id-02', columnId: 'column-id-01', title: 'HTML', memberIds: [] },
          { _id: 'card-id-02', boardId: 'board-id-02', columnId: 'column-id-01', title: 'CSS', memberIds: [] },
          { _id: 'card-id-03', boardId: 'board-id-02', columnId: 'column-id-01', title: 'Javascript/Typescript', memberIds: [] },
          { _id: 'card-id-04', boardId: 'board-id-02', columnId: 'column-id-01', title: 'ReactJS', memberIds: [] },
          { _id: 'card-id-05', boardId: 'board-id-02', columnId: 'column-id-01', title: 'Tailwindcss', memberIds: [] },
          { _id: 'card-id-06', boardId: 'board-id-02', columnId: 'column-id-01', title: 'Material-UI', memberIds: [] },
          { _id: 'card-id-07', boardId: 'board-id-02', columnId: 'column-id-01', title: 'Github', memberIds: [] }
        ]
      },
      {
        _id: 'column-id-02',
        boardId: 'board-id-02',
        title: 'CNGDC',
        cardOrderIds: ['card-id-04', 'card-id-02', 'card-id-01', 'card-id-03'],
        card: [
          { _id: 'card-id-01', boardId: 'board-id-02', columnId: 'column-id-02', title: 'Mèo hoang', memberIds: [] },
          { _id: 'card-id-02', boardId: 'board-id-02', columnId: 'column-id-02', title: 'Bartender', memberIds: [] },
          { _id: 'card-id-03', boardId: 'board-id-02', columnId: 'column-id-02', title: 'Kẻ thù', memberIds: [] },
          { _id: 'card-id-04', boardId: 'board-id-02', columnId: 'column-id-02', title: 'Em dạo này', memberIds: [] }
        ]
      },
      {
        _id: 'column-id-03',
        boardId: 'board-id-02',
        title: 'Gieo',
        cardOrderIds: ['card-id-01', 'card-id-02', 'card-id-03', 'card-id-04', 'card-id-05', 'card-id-06', 'card-id-07', 'card-id-08', 'card-id-09', 'card-id-10', 'card-id-11'],
        card: [
          { _id: 'card-id-01', boardId: 'board-id-02', columnId: 'column-id-03', title: 'Bạn thỏ tivi nhỏ', memberIds: [] },
          { _id: 'card-id-02', boardId: 'board-id-02', columnId: 'column-id-03', title: 'Mấy khi', memberIds: [] },
          { _id: 'card-id-03', boardId: 'board-id-02', columnId: 'column-id-03', title: 'Em trang trí', memberIds: [] },
          { _id: 'card-id-04', boardId: 'board-id-02', columnId: 'column-id-03', title: 'Điểm đến cuối cùng', memberIds: [] },
          { _id: 'card-id-05', boardId: 'board-id-02', columnId: 'column-id-03', title: 'Em trong đầu', memberIds: [] },
          { _id: 'card-id-06', boardId: 'board-id-02', columnId: 'column-id-03', title: 'Chào buổi sáng', memberIds: [] },
          { _id: 'card-id-07', boardId: 'board-id-02', columnId: 'column-id-03', title: 'Thấy chưa', memberIds: [] },
          { _id: 'card-id-08', boardId: 'board-id-02', columnId: 'column-id-03', title: 'Đá tan', memberIds: [] },
          { _id: 'card-id-09', boardId: 'board-id-02', columnId: 'column-id-03', title: 'Đêm hôm qua', memberIds: [] },
          { _id: 'card-id-10', boardId: 'board-id-02', columnId: 'column-id-03', title: 'Gieo', memberIds: [] },
          { _id: 'card-id-11', boardId: 'board-id-02', columnId: 'column-id-03', title: 'Mất tích', memberIds: [] }
        ]
      },
      {
        _id : 'column-id-04',
        boardId: 'board-id-02',
        title: 'Dummy text',
        cardOrderIds: ['card-id-01'],
        card: [
          { _id: 'card-id-01', boardId: 'board-id-02', columnId: 'column-id-04', title: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur magnam rerum repellendus sunt, est sapiente iusto, laudantium dicta accusamus quis voluptas eum enim possimus consectetur fuga aut. Laborum, voluptate fugit.', memberIds: [] }
        ]
      }
    ]
  }
}