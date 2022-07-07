import React, { Component } from "react";
import { motion } from "framer-motion";
import "./css/News.css";
import axios from "axios";
import Images from "./Images";

export default class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [
        {
          source: {
            id: null,
            name: "Lifehacker.com",
          },
          author: "Pranay Parab",
          title:
            "Change These Settings to Make the Brave Browser Even More Private",
          description:
            "The Brave Browser promotes itself as a Google Chrome alternative focused on privacy, but its default settings aren’t the most privacy friendly. If you need to use a Chrome-based browser, Brave is definitely a better option than what Google offers, but with a …",
          url: "https://lifehacker.com/change-these-settings-to-make-the-brave-browser-even-mo-1848763348",
          urlToImage:
            "https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/01381a080c579630dc5b17666ef95eef.jpg",
          publishedAt: "2022-04-07T18:30:00Z",
          content:
            "The Brave Browser promotes itself as a Google Chrome alternative focused on privacy, but its default settings arent the most privacy friendly. If you need to use a Chrome-based browser, Brave is defi… [+3493 chars]",
        },
        {
          source: {
            id: "engadget",
            name: "Engadget",
          },
          author: "Mariella Moon",
          title: "Wikipedia editors vote to block cryptocurrency donations",
          description:
            "Wikipedia editors have voted in favor of dropping cryptocurrency from the Wikimedia Foundation's donation options. As Ars Technica reports, an editor for the online encyclopedia called GorillaWarfare wrote a proposal for the foundation to stop accepting crypt…",
          url: "https://www.engadget.com/wikipedia-editors-vote-to-block-cryptocurrency-donations-113549175.html",
          urlToImage:
            "https://s.yimg.com/os/creatr-uploaded-images/2021-07/9f595ce0-de17-11eb-bef2-e1b1456d84ae",
          publishedAt: "2022-04-14T11:35:49Z",
          content:
            "Wikipedia editors have voted in favor of dropping cryptocurrency from the Wikimedia Foundation's donation options. As Ars Technica reports, an editor for the online encyclopedia called GorillaWarfare… [+1577 chars]",
        },
        {
          source: {
            id: null,
            name: "Lifehacker.com",
          },
          author: "Pranay Parab",
          title:
            "Change These Settings to Make the Brave Browser Even More Private",
          description:
            "The Brave Browser promotes itself as a Google Chrome alternative focused on privacy, but its default settings aren’t the most privacy friendly. If you need to use a Chrome-based browser, Brave is definitely a better option than what Google offers, but with a …",
          url: "https://lifehacker.com/change-these-settings-to-make-the-brave-browser-even-mo-1848763348",
          urlToImage:
            "https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/01381a080c579630dc5b17666ef95eef.jpg",
          publishedAt: "2022-04-07T18:30:00Z",
          content:
            "The Brave Browser promotes itself as a Google Chrome alternative focused on privacy, but its default settings arent the most privacy friendly. If you need to use a Chrome-based browser, Brave is defi… [+3493 chars]",
        },
        {
          source: {
            id: "engadget",
            name: "Engadget",
          },
          author: "Mariella Moon",
          title: "Wikipedia editors vote to block cryptocurrency donations",
          description:
            "Wikipedia editors have voted in favor of dropping cryptocurrency from the Wikimedia Foundation's donation options. As Ars Technica reports, an editor for the online encyclopedia called GorillaWarfare wrote a proposal for the foundation to stop accepting crypt…",
          url: "https://www.engadget.com/wikipedia-editors-vote-to-block-cryptocurrency-donations-113549175.html",
          urlToImage:
            "https://s.yimg.com/os/creatr-uploaded-images/2021-07/9f595ce0-de17-11eb-bef2-e1b1456d84ae",
          publishedAt: "2022-04-14T11:35:49Z",
          content:
            "Wikipedia editors have voted in favor of dropping cryptocurrency from the Wikimedia Foundation's donation options. As Ars Technica reports, an editor for the online encyclopedia called GorillaWarfare… [+1577 chars]",
        },
        {
          source: {
            id: null,
            name: "Lifehacker.com",
          },
          author: "Pranay Parab",
          title:
            "Change These Settings to Make the Brave Browser Even More Private",
          description:
            "The Brave Browser promotes itself as a Google Chrome alternative focused on privacy, but its default settings aren’t the most privacy friendly. If you need to use a Chrome-based browser, Brave is definitely a better option than what Google offers, but with a …",
          url: "https://lifehacker.com/change-these-settings-to-make-the-brave-browser-even-mo-1848763348",
          urlToImage:
            "https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/01381a080c579630dc5b17666ef95eef.jpg",
          publishedAt: "2022-04-07T18:30:00Z",
          content:
            "The Brave Browser promotes itself as a Google Chrome alternative focused on privacy, but its default settings arent the most privacy friendly. If you need to use a Chrome-based browser, Brave is defi… [+3493 chars]",
        },
        {
          source: {
            id: "engadget",
            name: "Engadget",
          },
          author: "Mariella Moon",
          title: "Wikipedia editors vote to block cryptocurrency donations",
          description:
            "Wikipedia editors have voted in favor of dropping cryptocurrency from the Wikimedia Foundation's donation options. As Ars Technica reports, an editor for the online encyclopedia called GorillaWarfare wrote a proposal for the foundation to stop accepting crypt…",
          url: "https://www.engadget.com/wikipedia-editors-vote-to-block-cryptocurrency-donations-113549175.html",
          urlToImage:
            "https://s.yimg.com/os/creatr-uploaded-images/2021-07/9f595ce0-de17-11eb-bef2-e1b1456d84ae",
          publishedAt: "2022-04-14T11:35:49Z",
          content:
            "Wikipedia editors have voted in favor of dropping cryptocurrency from the Wikimedia Foundation's donation options. As Ars Technica reports, an editor for the online encyclopedia called GorillaWarfare… [+1577 chars]",
        },
        {
          source: {
            id: null,
            name: "Lifehacker.com",
          },
          author: "Pranay Parab",
          title:
            "Change These Settings to Make the Brave Browser Even More Private",
          description:
            "The Brave Browser promotes itself as a Google Chrome alternative focused on privacy, but its default settings aren’t the most privacy friendly. If you need to use a Chrome-based browser, Brave is definitely a better option than what Google offers, but with a …",
          url: "https://lifehacker.com/change-these-settings-to-make-the-brave-browser-even-mo-1848763348",
          urlToImage:
            "https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/01381a080c579630dc5b17666ef95eef.jpg",
          publishedAt: "2022-04-07T18:30:00Z",
          content:
            "The Brave Browser promotes itself as a Google Chrome alternative focused on privacy, but its default settings arent the most privacy friendly. If you need to use a Chrome-based browser, Brave is defi… [+3493 chars]",
        },
        {
          source: {
            id: "engadget",
            name: "Engadget",
          },
          author: "Mariella Moon",
          title: "Wikipedia editors vote to block cryptocurrency donations",
          description:
            "Wikipedia editors have voted in favor of dropping cryptocurrency from the Wikimedia Foundation's donation options. As Ars Technica reports, an editor for the online encyclopedia called GorillaWarfare wrote a proposal for the foundation to stop accepting crypt…",
          url: "https://www.engadget.com/wikipedia-editors-vote-to-block-cryptocurrency-donations-113549175.html",
          urlToImage:
            "https://s.yimg.com/os/creatr-uploaded-images/2021-07/9f595ce0-de17-11eb-bef2-e1b1456d84ae",
          publishedAt: "2022-04-14T11:35:49Z",
          content:
            "Wikipedia editors have voted in favor of dropping cryptocurrency from the Wikimedia Foundation's donation options. As Ars Technica reports, an editor for the online encyclopedia called GorillaWarfare… [+1577 chars]",
        },
        {
          source: {
            id: null,
            name: "Lifehacker.com",
          },
          author: "Pranay Parab",
          title:
            "Change These Settings to Make the Brave Browser Even More Private",
          description:
            "The Brave Browser promotes itself as a Google Chrome alternative focused on privacy, but its default settings aren’t the most privacy friendly. If you need to use a Chrome-based browser, Brave is definitely a better option than what Google offers, but with a …",
          url: "https://lifehacker.com/change-these-settings-to-make-the-brave-browser-even-mo-1848763348",
          urlToImage:
            "https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/01381a080c579630dc5b17666ef95eef.jpg",
          publishedAt: "2022-04-07T18:30:00Z",
          content:
            "The Brave Browser promotes itself as a Google Chrome alternative focused on privacy, but its default settings arent the most privacy friendly. If you need to use a Chrome-based browser, Brave is defi… [+3493 chars]",
        },
        {
          source: {
            id: "engadget",
            name: "Engadget",
          },
          author: "Mariella Moon",
          title: "Wikipedia editors vote to block cryptocurrency donations",
          description:
            "Wikipedia editors have voted in favor of dropping cryptocurrency from the Wikimedia Foundation's donation options. As Ars Technica reports, an editor for the online encyclopedia called GorillaWarfare wrote a proposal for the foundation to stop accepting crypt…",
          url: "https://www.engadget.com/wikipedia-editors-vote-to-block-cryptocurrency-donations-113549175.html",
          urlToImage:
            "https://s.yimg.com/os/creatr-uploaded-images/2021-07/9f595ce0-de17-11eb-bef2-e1b1456d84ae",
          publishedAt: "2022-04-14T11:35:49Z",
          content:
            "Wikipedia editors have voted in favor of dropping cryptocurrency from the Wikimedia Foundation's donation options. As Ars Technica reports, an editor for the online encyclopedia called GorillaWarfare… [+1577 chars]",
        },
        {
          source: {
            id: null,
            name: "Lifehacker.com",
          },
          author: "Pranay Parab",
          title:
            "Change These Settings to Make the Brave Browser Even More Private",
          description:
            "The Brave Browser promotes itself as a Google Chrome alternative focused on privacy, but its default settings aren’t the most privacy friendly. If you need to use a Chrome-based browser, Brave is definitely a better option than what Google offers, but with a …",
          url: "https://lifehacker.com/change-these-settings-to-make-the-brave-browser-even-mo-1848763348",
          urlToImage:
            "https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/01381a080c579630dc5b17666ef95eef.jpg",
          publishedAt: "2022-04-07T18:30:00Z",
          content:
            "The Brave Browser promotes itself as a Google Chrome alternative focused on privacy, but its default settings arent the most privacy friendly. If you need to use a Chrome-based browser, Brave is defi… [+3493 chars]",
        },
        {
          source: {
            id: "engadget",
            name: "Engadget",
          },
          author: "Mariella Moon",
          title: "Wikipedia editors vote to block cryptocurrency donations",
          description:
            "Wikipedia editors have voted in favor of dropping cryptocurrency from the Wikimedia Foundation's donation options. As Ars Technica reports, an editor for the online encyclopedia called GorillaWarfare wrote a proposal for the foundation to stop accepting crypt…",
          url: "https://www.engadget.com/wikipedia-editors-vote-to-block-cryptocurrency-donations-113549175.html",
          urlToImage:
            "https://s.yimg.com/os/creatr-uploaded-images/2021-07/9f595ce0-de17-11eb-bef2-e1b1456d84ae",
          publishedAt: "2022-04-14T11:35:49Z",
          content:
            "Wikipedia editors have voted in favor of dropping cryptocurrency from the Wikimedia Foundation's donation options. As Ars Technica reports, an editor for the online encyclopedia called GorillaWarfare… [+1577 chars]",
        },
      ],
      width: 0,
    };
  }

  componentDidMount() {
    this.setState({ width: 6430 });
    const today = new Date();
    var dateToday =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    axios
      .get(
        "https://newsapi.org/v2/everything?q=crypto&from=" +
          dateToday +
          "&sortBy=popularity&apiKey=0650eca3f75d4a16beb8c410626d94be"
      )
      .then(async (res) => {
        this.setState({
          news:
            (await res["data"]["articles"]) !== null
              ? res["data"]["articles"]
              : this.state.news,
        });
      });
  }

  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="centerHeader">Today</div>
        </div>
        <div>
          <motion.div className="carousel" whileTap={{ cursor: "grabbing" }}>
            <motion.div
              drag="x"
              dragConstraints={{ right: 0, left: -this.state.width }}
              className="inner-carousel"
            >
              {Images.length < this.state.news.length
                ? Images.map((image, key) => {
                    return (
                      <motion.div className="item" key={image}>
                        <img src={image} alt="ImageNews" />
                        <div className="containerText">
                          <div className="newstitle">
                            {this.state.news[key % 12]["author"] !== null
                              ? "By " +
                                this.state.news[key % 12]["author"].substring(
                                  0,
                                  23
                                ) +
                                "..."
                              : "By CoinXpe"}
                          </div>
                          <div className="newstitlesmall">
                            {this.state.news[key % 12]["title"]}
                          </div>
                          <div className="newsDes">
                            {this.state.news[key % 12]["description"]}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })
                : this.state.news.map((news, key) => {
                    return (
                      <motion.div className="item" key={key}>
                        <img src={Images[key % 12]} alt="ImageNews" />
                        <div className="containerText">
                          <div className="newstitle">
                            {news["author"] !== null
                              ? "By " + news["author"].substring(0, 23) + "..."
                              : "By CoinXpe"}
                          </div>
                          <div className="newstitlesmall">{news["title"]}</div>
                          <div className="newsDes">{news["description"]}</div>
                        </div>
                      </motion.div>
                    );
                  })}
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }
}
