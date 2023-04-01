import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { deleteBlog, getSingleBlog } from "../../apis/blog";
import { getCommentCount, getCommentsByBlogId } from "../../apis/comment";
import { userContext } from "../../components/context/UserContext";
import Avatar from "../../components/shared/avatar/Avatar";
import CustomAlert from "../../components/shared/customAlert/CustomAlert";
import TimeStamp from "../../components/shared/timeStapm/TimeStamp";
import Comment from "../../components/single/Comment";
import CommentForm from "../../components/single/CommentForm";
import Menu from "../../components/single/Menu";
import { pageCounter } from "../../utils/pageCounter";
import "./single.scss";

const Single = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { userInfo } = useContext(userContext);
  const [blogData, setBlogData] = useState({});
  const [error, setError] = useState(null);
  const [deleteError, setDeleteError] = useState(null);

  const [comments, setComments] = useState([]);
  const [totalCommentsPage, setTotalCommentsPage] = useState(0);
  const [commentsCurrentPage, setCommentsCurrentPage] = useState(0);
  const [rowsPerPage] = useState(10);

  const handleRoute = () => {
    navigate(`/write?edit=${id}`);
  };

  useEffect(() => {
    if (!id) return;

    getCommentCount(id).then((data) => {
      setTotalCommentsPage(pageCounter(data.count, rowsPerPage));
    });
  }, [id, rowsPerPage]);

  useEffect(() => {
    const get = async (blogId) => {
      const { blog, errorMessage } = await getSingleBlog(blogId);
      const blogData = {
        ...blog,
        img: JSON.parse(blog.img),
        authorImg: JSON.parse(blog.authorImg),
      };
      setBlogData(blogData);
      setError(errorMessage);
    };
    if (id) {
      get(id);
    }
  }, [id]);

  useEffect(() => {
    if (!totalCommentsPage) return;

    getCommentsByBlogId(
      id,
      rowsPerPage,
      rowsPerPage * commentsCurrentPage
    ).then((data) => {
      const commentsInfo = data.comments.map((c) => ({
        ...c,
        authorImg: JSON.parse(c.authorImg),
      }));
      if (!data.errorMessage) {
        setComments((prev) => [...commentsInfo, ...prev]);
      }
    });
  }, [id, rowsPerPage, commentsCurrentPage, totalCommentsPage]);

  const handleNextPage = () => {
    setCommentsCurrentPage((prev) => prev + 1);
  };

  const handleDelete = async () => {
    const { message, errorMessage } = await deleteBlog(id);
    if (message) {
      navigate(-1);
    } else {
      setDeleteError(errorMessage);
    }
  };

  return (
    <section className="section-height single mt-5">
      {error ? (
        <CustomAlert message={error} variant={"danger"} />
      ) : (
        <Row>
          <Col md={"8"} sm={"12"}>
            <img
              src={blogData?.img?.display_url}
              alt="blog-img"
              className="post-img rounded border-shadow"
            />
            <div className="my-2">
              <string>Category: {blogData?.category_name}</string>
            </div>
            <div className="user mt-3">
              {blogData?.authorImg?.display_url && (
                <Avatar src={blogData?.authorImg?.display_url} alt="" />
              )}
              <div className="info">
                <h6 className="m-0 p-0">{blogData?.authorName}</h6>
                <p className="m-0 p-0">
                  <TimeStamp
                    createAt={blogData.createAt}
                    updateAt={blogData.updateAt}
                  />
                </p>

                {userInfo.id && userInfo.id === blogData?.authorId ? (
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
                ) : null}
              </div>
            </div>
            {deleteError && (
              <div className="my-3">
                <CustomAlert
                  variant={"danger"}
                  message={deleteError}
                  setState={setDeleteError}
                />
              </div>
            )}
            <div className="post-content mt-4">
              <h3>Overview</h3>
              <div
                className="w-100"
                dangerouslySetInnerHTML={{ __html: blogData.description }}
              ></div>
            </div>
            <div className="mt-4">
              {userInfo.id ? (
                <CommentForm
                  blogId={blogData.id}
                  setComments={setComments}
                  setPageCount={setTotalCommentsPage}
                  totalPages={totalCommentsPage}
                />
              ) : null}
              <h3>Comments</h3>
              {totalCommentsPage === 0 ? (
                <CustomAlert message={"No comment yet!"} variant={"info"} />
              ) : (
                <>
                  {comments?.map((comment) => (
                    <Comment
                      key={comment.id}
                      comment={comment}
                      setComments={setComments}
                    />
                  ))}
                  {commentsCurrentPage < totalCommentsPage - 1 ? (
                    <div className="mt-2">
                      <Button
                        className={"btn btn-info"}
                        onClick={handleNextPage}
                      >
                        More Comment...
                      </Button>
                    </div>
                  ) : null}
                </>
              )}
            </div>
          </Col>
          <Col md={"4"} sm={"12"}>
            <Menu category={blogData?.categoryId} blogId={blogData.id} />
          </Col>
        </Row>
      )}
    </section>
  );
};

export default Single;
