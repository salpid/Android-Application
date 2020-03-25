import React, { Component } from "react";

import "../../css/main.scss";
import Pic from "../../assets/img/pic.jpg";
import Car from "../../assets/img/car.png";

export default class BooksWall extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="products">
          <div className="tool-box">
            <span className="logo-text">阅读成就生活</span>
            <span className="search-box">
              <div className="search-input">
                <input type="text" className="input" id="" />
              </div>
            </span>
            <span className="cart-box">
              <img src={Car} alt="" />
              （0）
            </span>
          </div>

          <div className="content">
            <ul>
              <li>
                <div className="product">
                  <span className="p-head"></span>
                  <span className="p-content">
                    <span className="img-wrapper">
                      <img src={Pic} alt="人生海海" />
                    </span>
                    <span className="p-tags">小说</span>
                    <span className="p-name">《人生海海》</span>
                  </span>
                  <span className="p-footer">
                    <span className="price">55.00</span>
                    <span className="add-cart"></span>
                  </span>
                </div>
              </li>

              <li>
                <div className="product">
                  <span className="p-head"></span>
                  <span className="p-content">
                    <span className="img-wrapper">
                      <img src={Pic} alt="人生海海" />
                    </span>
                    <span className="p-tags">小说</span>
                    <span className="p-name">《人生海海》</span>
                  </span>
                  <span className="p-footer">
                    <span className="price">55.00</span>
                    <span className="add-cart"></span>
                  </span>
                </div>
              </li>

              <li>
                <div className="product">
                  <span className="p-head"></span>
                  <span className="p-content">
                    <span className="img-wrapper">
                      <img src={Pic} alt="人生海海" />
                    </span>
                    <span className="p-tags">小说</span>
                    <span className="p-name">《人生海海》</span>
                  </span>
                  <span className="p-footer">
                    <span className="price">55.00</span>
                    <span className="add-cart"></span>
                  </span>
                </div>
              </li>

              <li>
                <div className="product">
                  <span className="p-head"></span>
                  <span className="p-content">
                    <span className="img-wrapper">
                      <img src={Pic} alt="人生海海" />
                    </span>
                    <span className="p-tags">小说</span>
                    <span className="p-name">《人生海海》</span>
                  </span>
                  <span className="p-footer">
                    <span className="price">55.00</span>
                    <span className="add-cart"></span>
                  </span>
                </div>
              </li>

              <li>
                <div className="product">
                  <span className="p-head"></span>
                  <span className="p-content">
                    <span className="img-wrapper">
                      <img src={Pic} alt="人生海海" />
                    </span>
                    <span className="p-tags">小说</span>
                    <span className="p-name">《人生海海》</span>
                  </span>
                  <span className="p-footer">
                    <span className="price">55.00</span>
                    <span className="add-cart"></span>
                  </span>
                </div>
              </li>

              <li>
                <div className="product">
                  <span className="p-head"></span>
                  <span className="p-content">
                    <span className="img-wrapper">
                      <img src={Pic} alt="人生海海" />
                    </span>
                    <span className="p-tags">小说</span>
                    <span className="p-name">《人生海海》</span>
                  </span>
                  <span className="p-footer">
                    <span className="price">55.00</span>
                    <span className="add-cart"></span>
                  </span>
                </div>
              </li>

              <li>
                <div className="product">
                  <span className="p-head"></span>
                  <span className="p-content">
                    <span className="img-wrapper">
                      <img src={Pic} alt="人生海海" />
                    </span>
                    <span className="p-tags">小说</span>
                    <span className="p-name">《人生海海》</span>
                  </span>
                  <span className="p-footer">
                    <span className="price">55.00</span>
                    <span className="add-cart"></span>
                  </span>
                </div>
              </li>

              <li>
                <div className="product">
                  <span className="p-head"></span>
                  <span className="p-content">
                    <span className="img-wrapper">
                      <img src={Pic} alt="人生海海" />
                    </span>
                    <span className="p-tags">小说</span>
                    <span className="p-name">《人生海海》</span>
                  </span>
                  <span className="p-footer">
                    <span className="price">55.00</span>
                    <span className="add-cart"></span>
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
