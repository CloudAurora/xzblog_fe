const moment = require('moment');
const koaBody = require('koa-body');

const getOk = data => ({
  code: 200,
  message: 'success',
  data,
});

module.exports = (router) => {
  router.get('/questionnaires', async (ctx) => {
    const { pageNo, pageSize } = ctx.query;
    ctx.body = getOk({
      count: 500,
      page_no: +pageNo || 1,
      page_size: +pageSize || 10,
      page_data: Array.from({ length: 10 }, (_, index) => ({
        ctime: moment().unix(),
        creator: 'feiyue',
        mtime: moment().unix(),
        id: index,
        name: `测试问卷${index}`,
        description: `测试问卷描述${index}`,
      })),
    });
  });

  router.get('/questionnaires/:id', async (ctx) => {
    const { id } = ctx.params;
    console.log('request:', id);
    ctx.body = getOk(sample);
  });
  router.post('/questionnaires', koaBody(), async (ctx) => {
    // const body = JSON.stringify(ctx.request.body);
    // fs.writeFileSync('server/tmp.json', body);
    await new Promise(resolve => setTimeout(() => resolve(), 3000));
    ctx.body = getOk(null);
  });
};

const sample = {
  background: {
    type: 'color',
    color: '#EEF0F3',
  },
  header: {
    type: 'none',
  },
  title_color: '#2d2d2d',
  footer: 'Powered by Bytedance',
  prompt: '感谢参与！',
  title: '',
  desc: '',
  questions: [
    {
      id: '$abcdefg',
      type: 'page_break',
    },
    {
      id: '$10ba038e-48da-487b-96e8-8d3b99b6d18a',
      type: 'multi',
      name: '问题',
      required: false,
      custom: {
        random: true,
        other: {
          status: 1,
          is_trap: 0,
        },
        options: [
          {
            id: 'asdfgfdshgfvz',
            text: '选项',
            is_trap: false,
          },
        ],
      },
    },
    {
      id: '$abcdefghijklmn',
      type: 'single',
      name: '问题',
      required: true,
      custom: {
        random: true,
        other: {
          status: 1,
          jump_id: '-1',
          is_trap: 0,
        },
        options: [
          {
            id: 'b2d2845c-ac72-479c-b0f4-7154135ca342',
            text: '选项1',
            jump_id: '-1',
            is_trap: false,
          },
          {
            id: 'b2d2845c-ac72-479c-b0f4-7154135ca33',
            text: '选项2',
            jump_id: '-1',
            is_trap: true,
          },
        ],
      },
    },
    {
      id: '$10ba038e-48da-487b-96e8-8d3b99b6d18ab',
      type: 'short',
      name: '问题',
      required: false,
      custom: {
        text: '内容长度请控制在50字以内',
      },
    },
    {
      id: '$10ba038e-48da-487b-96e8-8d3b99b6d18abc',
      type: 'long',
      name: '问题',
      required: false,
      custom: {
        text: '内容长度请控制在500字以内',
      },
    },
    {
      id: '$aaaaaaaaaaaaaaaa',
      type: 'scale',
      name: '量表',
      required: false,
      custom: {
        min: {
          num: 0,
          text: '不可能',
        },
        max: {
          num: 10,
          text: '极有可能',
        },
      },
    },
  ],
};
