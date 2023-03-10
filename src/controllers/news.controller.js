import {createService, findAllService, countNews, topNewsService, findByIdService} from "../services/news.service.js";

export const create = async (req, res) =>{
  try{
    const {title, text, banner} = req.body;

    if(!title || !text || !banner){
        res.status(400).send({
            message:"Submit all fields for registration"
        });
    };

    await createService({
        title,
        text,
        banner,
        user: req.userId, 
    });

    res.send(201);
  }
  catch (err) {
    res.status(500).send({message: err.message});
  }

};

export const findAll = async (req, res) =>{
  try{
      let {limit, offset} = req.query;

      limit = Number(limit);
      offset = Number(offset);

      if(!limit){
        limit = 5;
      };

      if(!offset){
        offset = 0;
      };

      const news = await findAllService(offset, limit);
      const total = await countNews();
      const currentURL = req.baseUrl

      const next = offset + limit;
      const nextURL = next < total ? `${currentURL}?limit=${limit}&offset=${next}` : null;

      const previous = offset - limit < 0 ? null : offset - limit;
      const previousURL = previous != null ? `${currentURL}?limit=${limit}&offset=${previous}` : null

      if(news.length === 0){
          return res.status(400).send({
              message: "There are no registered news"
          });
      }

      res.send({
        nextURL,
        previousURL,
        limit,
        offset,
        total,

        results: news.map((item) => ({
          id: item._id,
          title: item.title,
          text : item.text,
          banner: item.banner,
          likes: item.likes,
          comments: item.comments,
          name: item.user.name,
          username: item.user.username,
          userAvatar: item.user.avatar,
        })),
      });
    }
    catch (err) {
      res.status(500).send({message: err.message});
    }
};

export const topNews = async (req, res) =>{
  try{
    const news = await topNewsService();

    if(!news){
      return res.status(400).send({
        message: "There are no registered news"
      });
    }

    res.send({
      news: {
        id: news._id,
        title: news.title,
        text : news.text,
        banner: news.banner,
        likes: news.likes,
        comments: news.comments,
        name: news.user.name,
        username: news.user.username,
        userAvatar: news.user.avatar,
      }
    })
  }
  catch (err) {
    res.status(500).send({message: err.message});
  }
};

export const findById = async (req, res) => {
  try{
    const { id } = req.params;
    const news = await findByIdService(id);
    return res.send({
      news: {
        id: news._id,
        title: news.title,
        text : news.text,
        banner: news.banner,
        likes: news.likes,
        comments: news.comments,
        name: news.user.name,
        username: news.user.username,
        userAvatar: news.user.avatar,
      }
    })
  }
  catch (err) {
    res.status(500).send({message: err.message});
  }
}