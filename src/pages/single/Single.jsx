import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Menu from "../../components/single/Menu";
import "./single.scss";

const Single = () => {
  const navigate = useNavigate();

  const handleRoute = () => {
    navigate(`/write?edit=2`);
  };

  const handleDelete = () => {};

  return (
    <section className="section-height single mt-5">
      <Row>
        <Col md={"8"} sm={"12"}>
          <img
            src="https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt=""
            className="post-img rounded border-shadow"
          />
          <div className="user mt-4">
            <img
              src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWFufGVufDB8fDB8fA%3D%3D&w=1000&q=80"
              alt=""
              className="avatar border-shadow"
            />
            <div className="info">
              <h6 className="m-0 p-0">Jhon</h6>
              <p className="m-0 p-0">posted 2 days ago</p>

              <div className="buttons">
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={handleRoute}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={handleDelete}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </div>
            </div>
          </div>
          <div className="post-content">
            <h1>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam,
              quod!
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam,
              labore, quod consequuntur architecto voluptates expedita
              laboriosam, blanditiis error vel tempora unde pariatur quae.
              Recusandae libero dolor voluptates rerum voluptatum, cupiditate
              nostrum qui ipsam. Dolor consequatur explicabo quos, blanditiis
              consequuntur assumenda repellat illo molestias delectus nulla
              unde, aliquam, tempora laboriosam dolorum quas odit fugiat porro
              in ad nihil a qui voluptates. Ratione animi cupiditate consequatur
              tempora necessitatibus ad quidem tempore cumque mollitia repellat
              facilis, iste consectetur magnam tenetur, quia et architecto modi.
              Iste doloremque officiis perferendis mollitia expedita molestias.
              Mollitia quidem blanditiis sunt nihil nam voluptas quo amet
              expedita vero. Dolorem omnis cumque officia corrupti ducimus ut
              enim fuga. Quia iure aperiam tempora saepe, numquam quisquam
              voluptas fugit, maxime earum perspiciatis, dolorum sapiente aut
              cum optio natus ratione ut sunt quaerat atque dolorem. Sed soluta
              explicabo quos fuga voluptas ab unde voluptatibus voluptatum cum
              qui minima, earum, asperiores aliquam nihil dolore odio? Ea
              sapiente doloribus inventore dolores laboriosam facilis dicta
              dolore iusto. Esse, commodi cupiditate? Sapiente dolorum at
              quibusdam officia maxime fugit eius molestiae, aliquid placeat,
              natus, amet error nam quidem eligendi architecto esse. Doloribus,
              id fugiat earum iste consectetur, tempore cupiditate praesentium
              magni quod non alias laudantium eius deserunt molestias? Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Unde illo
              veritatis natus quas reprehenderit maxime architecto deleniti
              necessitatibus harum obcaecati, numquam placeat dicta quidem
              pariatur a beatae saepe aspernatur odit soluta ullam molestias
              sequi facilis? Assumenda, eaque suscipit expedita voluptate sunt,
              placeat sint blanditiis sapiente consequuntur dicta cum nesciunt
              temporibus libero aspernatur architecto maxime recusandae officiis
              facere, unde atque ex fugiat? Earum, magni architecto eaque
              pariatur provident, laudantium laboriosam dignissimos obcaecati
              rerum vero, nobis accusamus aliquid. Animi minima quasi optio rem
              ducimus unde sint voluptatem, accusamus eligendi dolores maxime
              aut aperiam commodi laboriosam ratione facere sunt error vel atque
              totam! Animi dicta, doloremque soluta odit quod quasi tempora odio
              modi et quae ducimus? Officiis, tenetur eos recusandae quis
              voluptas unde quidem eligendi obcaecati nam nesciunt esse cum
              magni laboriosam autem incidunt porro, sed maxime dolores sint!
              Incidunt, pariatur quos. Sapiente vero doloribus eaque ullam quod
              similique harum quis dignissimos est? Praesentium dicta quod
              facere modi, accusantium error doloribus omnis, officiis unde
              sequi delectus? Praesentium repudiandae nobis culpa nulla quos
              laudantium ullam unde delectus autem iure aliquam, quo tenetur
              voluptas. Sed saepe dolores impedit modi! Architecto minus id
              mollitia quae excepturi sapiente autem praesentium vitae suscipit,
              voluptatem impedit esse officia sed!
            </p>
          </div>
        </Col>
        <Col md={"4"} sm={"12"}>
          <Menu />
        </Col>
      </Row>
    </section>
  );
};

export default Single;
