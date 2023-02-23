import {
  Button,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  Row,
  ButtonGroup,
} from "reactstrap";
import Select2 from "react-select2-wrapper";
import React, { useState } from "react";
import { alertService } from "../../../services/alertService";
import { usePostData } from "../../../hooks/services/usePostApi";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { EDU_URL } from "../../../constants/api";
import SelectboxField from "../../../components/CustomField/SelectboxField";

const MCreateTest = (props) => {
  const { isOpen, setModalOpen, refreshParent, idTest } = props;

  const styleCk = {
    marginLeft: 1,
  };
  const styleLableCk = {
    marginLeft: 25,
  };
  const formInitValueWithOne = {
    content: "",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    point: 10,
  };
  const validationSchemaWithOne = Yup.object().shape({
    content: Yup.string().required("Không được để trống"),
    answer1: Yup.string().required("Không được để trống"),
    answer2: Yup.string().required("Không được để trống"),
    answer3: Yup.string().required("Không được để trống"),
    answer4: Yup.string().required("Không được để trống"),
    point: Yup.string().required("Không được để trống"),
  });
  const types = ["SINGLE CHOICE", "MULTIPLE CHOICE", "TRUE/FALSE"];
  const putSuccess = (val) => {
    if (val?.status + "" === "201") {
      alertService.success("Thêm mới thành công");
    }
    setModalOpen(false);
    refreshParent();
  };
  const putFail = (val) => {
    alertService.error(val?.data?.message);
  };
  const postCreate = usePostData(
    null,
    true,
    null,
    false,
    false,
    putSuccess,
    putFail
  );
  const [typeTest, setTypeTest] = useState();
  const [isCorrectSingle, setIsCorrectSingle] = useState(false);
  const [isCorrect2, setIsCorrect2] = useState(false);
  const [isCorrect3, setIsCorrect3] = useState(false);
  const [isCorrect4, setIsCorrect4] = useState(false);
  const [isCorrect5, setIsCorrect5] = useState(false);
  const [isCorrect6, setIsCorrect6] = useState(false);

  // console.log(isCorrectSingle + "1type single");
  // console.log(isCorrect2 + "2");
  // console.log(isCorrect3 + "3");
  // console.log(isCorrect4 + "4");
  const onConfirm = (values) => {
    if (typeTest === "SINGLE CHOICE") {
      const body = {
        testId: idTest,
        question: {
          content: values?.content,
        },
        choices: [
          {
            answer: values?.answer1,
            isCorrect: isCorrectSingle === "on1" ? true : false,
          },
          {
            answer: values?.answer2,
            isCorrect: isCorrectSingle === "on2" ? true : false,
          },
          {
            answer: values?.answer3,
            isCorrect: isCorrectSingle === "on3" ? true : false,
          },
          {
            answer: values?.answer4,
            isCorrect: isCorrectSingle === "on4" ? true : false,
          },
        ],
        type: typeTest,
        //   point: values?.point,
        point: values?.point,
      };
      // content: values?.content,
      console.log(values);
      console.log(body);
      void postCreate._postData(`${EDU_URL.CREATE_TEST}`, body);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen}>
        <div className="modal-header">
          <h3 className="modal-title font-weight-bold" id="exampleModalLabel">
            Thêm câu hỏi mới
          </h3>
          <button
            aria-label="Close"
            className="close"
            type="button"
            onClick={() => setModalOpen(false)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <ModalBody>
          <Row>
            <FormGroup className="col-sm-12">
              <Label>
                Chọn loại câu hỏi &nbsp;
                <span className="text-danger">*</span>
              </Label>
              <Input
                className="col-sm-12 form-control"
                type="select"
                onChange={(e) => setTypeTest(e.target.value)}
              >
                <option value="">Chọn thể loại</option>
                {types.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Row>
          {typeTest === "SINGLE CHOICE" && (
            <Formik
              initialValues={formInitValueWithOne}
              validationSchema={validationSchemaWithOne}
              onSubmit={onConfirm}
            >
              {({
                values,
                touched,
                errors,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => (
                <Form>
                  <ButtonGroup>
                    <Row>
                      <FormGroup className="col-sm-12">
                        <Label>
                          Nội dung câu hỏi&nbsp;
                          <span className="text-danger">*</span>
                        </Label>
                        <Input
                          name="content"
                          tag={Field}
                          placeholder="Nhập nội dung câu hỏi"
                          value={values.content}
                          invalid={!!(touched.content && errors.content)}
                        />
                      </FormGroup>
                      <FormGroup className="col-sm-12 formAwe" check>
                        <Label>
                          Câu trả lời thứ 1&nbsp;
                          <span className="text-danger">*</span>
                        </Label>
                        <Input
                          name="answer1"
                          tag={Field}
                          placeholder="Nhập đáp án thứ nhất"
                          value={values.answer1}
                          invalid={!!(touched.answer1 && errors.answer1)}
                        />
                        <Input
                          style={styleCk}
                          name="radio2"
                          type="radio"
                          // onChange={setCheck1}
                          onChange={(e) =>
                            setIsCorrectSingle(e.target.value + "1")
                          }
                        />{" "}
                        <Label style={styleLableCk} check>
                          Đáp án 1 chính xác
                        </Label>
                      </FormGroup>
                      <FormGroup className="col-sm-12 formAwe" check>
                        <Label>
                          Câu trả lời thứ 2&nbsp;
                          <span className="text-danger">*</span>
                        </Label>
                        <Input
                          name="answer2"
                          tag={Field}
                          placeholder="Nhập đáp án thứ 2"
                          value={values.answer2}
                          invalid={!!(touched.answer2 && errors.answer2)}
                        />
                        <Input
                          style={styleCk}
                          name="radio2"
                          type="radio"
                          // onChange={setCheck1}
                          onChange={(e) =>
                            setIsCorrectSingle(e.target.value + "2")
                          }
                        />{" "}
                        <Label style={styleLableCk} check>
                          Đáp án 2 chính xác
                        </Label>
                      </FormGroup>
                      <FormGroup className="col-sm-12 formAwe" check>
                        <Label>
                          Câu trả lời thứ 3&nbsp;
                          <span className="text-danger">*</span>
                        </Label>
                        <Input
                          name="answer3"
                          tag={Field}
                          placeholder="Nhập đáp án thứ 3"
                          value={values.answer3}
                          invalid={!!(touched.answer3 && errors.answer3)}
                        />
                        <Input
                          style={styleCk}
                          name="radio2"
                          type="radio"
                          onChange={(e) =>
                            setIsCorrectSingle(e.target.value + "3")
                          }
                        />{" "}
                        <Label style={styleLableCk} check>
                          Đáp án 3 chính xác
                        </Label>
                      </FormGroup>
                      <FormGroup className="col-sm-12 formAwe" check>
                        <Label>
                          Câu trả lời thứ 4&nbsp;
                          <span className="text-danger">*</span>
                        </Label>
                        <Input
                          name="answer4"
                          tag={Field}
                          placeholder="Nhập đáp án thứ 4"
                          value={values.answer4}
                          invalid={!!(touched.answer4 && errors.answer4)}
                        />
                        <Input
                          style={styleCk}
                          name="radio2"
                          type="radio"
                          onChange={(e) =>
                            setIsCorrectSingle(e.target.value + "4")
                          }
                        />{" "}
                        <Label style={styleLableCk} check>
                          Đáp án 4 chính xác
                        </Label>
                      </FormGroup>

                      <FormGroup className="col-sm-12">
                        <Label>
                          Điểm&nbsp;
                          <span className="text-danger">*</span>
                        </Label>
                        <Input
                          name="point"
                          type="number"
                          tag={Field}
                          placeholder="Nhập tên trường đại học"
                          value={values.point}
                          invalid={!!(touched.point && errors.point)}
                        />
                      </FormGroup>
                    </Row>
                  </ButtonGroup>
                  <Row>
                    <div className="col-sm-12 text-right">
                      <Button
                        color="default"
                        outline
                        type="button"
                        onClick={() => setModalOpen(false)}
                      >
                        Hủy
                      </Button>
                      <Button color="primary" type="submit">
                        OK
                      </Button>
                    </div>
                  </Row>
                </Form>
              )}
            </Formik>
          )}
        </ModalBody>
      </Modal>
    </>
  );
};

export default MCreateTest;
