import moment from "moment";

const TimeStamp = ({ createAt, updateAt }) => {
  return createAt === updateAt ? (
    <>Published: {moment(createAt).fromNow()}</>
  ) : (
    <>Updated: {moment(updateAt).fromNow()}</>
  );
};

export default TimeStamp;
