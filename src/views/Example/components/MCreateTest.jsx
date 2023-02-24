import {
  Button,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  Row,
} from "reactstrap";
import React, { useState } from "react";
import { alertService } from "../../../services/alertService";
import { usePostData } from "../../../hooks/services/usePostApi";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { EDU_URL } from "../../../constants/api";

const MCreateTest = (props) => {
  const { isOpen, setModalOpen, refreshParent, idTest } = props;

  const styleCk = {
    marginLeft: 1,
  };
  const styleLableCk = {
    marginLeft: 25,
  };

  // formInitValue Single
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

  //formInitValue True/false
  const formInitValueWithTrueOrFalse = {
    attachment: "",
    content: "",
    point: 10,
  };
  const validationSchemaTrueOrFalse = Yup.object().shape({
    attachment: Yup.string().required("Không được để trống"),
    content: Yup.string().required("Không được để trống"),
    attachment: Yup.string().required("Không được để trống"),
    point: Yup.string().required("Không được để trống"),
  });

  //formInitValue Multiple
  const formInitValueWithMultiple = {
    attachment: "",
    content: "",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    answer5: "",
    answer6: "",
    point: 10,
  };
  const validationSchemaWithMultiple = Yup.object().shape({
    attachment: Yup.string().required("Không được để trống"),
    content: Yup.string().required("Không được để trống"),
    answer1: Yup.string().required("Không được để trống"),
    answer2: Yup.string().required("Không được để trống"),
    answer3: Yup.string().required("Không được để trống"),
    answer4: Yup.string().required("Không được để trống"),
    answer5: Yup.string().required("Không được để trống"),
    answer6: Yup.string().required("Không được để trống"),
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
  const [isCorrect1, setIsCorrect1] = useState(false);
  const [isCorrect2, setIsCorrect2] = useState(false);
  const [isCorrect3, setIsCorrect3] = useState(false);
  const [isCorrect4, setIsCorrect4] = useState(false);
  const [isCorrect5, setIsCorrect5] = useState(false);
  const [isCorrect6, setIsCorrect6] = useState(false);

  const onConfirm = (values) => {
    //single type
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
        point: values?.point,
      };
      void postCreate._postData(`${EDU_URL.CREATE_TEST}`, body);
    }
    // true/false type
    else if (typeTest === "TRUE/FALSE") {
      const body = {
        testId: idTest,
        question: {
          attachment: values?.attachment,
          content: values?.content,
        },
        choices: [
          {
            answer: "True",
            isCorrect: isCorrectSingle === "on1" ? true : false,
          },
          {
            answer: "False",
            isCorrect: isCorrectSingle === "on2" ? true : false,
          },
        ],
        type: "SINGLE CHOICE",
        point: values?.point,
      };

      void postCreate._postData(`${EDU_URL.CREATE_TEST}`, body);
    }
    //multiple type
    else if (typeTest === "MULTIPLE CHOICE") {
      const body = {
        testId: idTest,
        question: {
          attachment: values?.attachment,
          content: values?.content,
        },
        choices: [
          {
            answer: values?.answer1,
            isCorrect: isCorrect1,
          },
          {
            answer: values?.answer2,
            isCorrect: isCorrect2,
          },
          {
            answer: values?.answer3,
            isCorrect: isCorrect3,
          },
          {
            answer: values?.answer4,
            isCorrect: isCorrect4,
          },
          {
            answer: values?.answer5,
            isCorrect: isCorrect5,
          },
          {
            answer: values?.answer6,
            isCorrect: isCorrect6,
          },
        ],
        type: typeTest,
        point: values?.point,
      };
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
                Chọn dạng câu hỏi &nbsp;
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
          {typeTest === "TRUE/FALSE" && (
            <Formik
              initialValues={formInitValueWithTrueOrFalse}
              validationSchema={validationSchemaTrueOrFalse}
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
                  <Row>
                    <FormGroup className="col-sm-12">
                      <Label>
                        Thêm video hoặc hình ảnh&nbsp;
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        name="attachment"
                        tag={Field}
                        placeholder="Thêm ảnh hoặc video"
                        value={values.attachment}
                        type="file"
                        invalid={!!(touched.attachment && errors.attachment)}
                      />
                    </FormGroup>
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
                        True là đáp án chính xác&nbsp;
                        <span className="text-danger">*</span>
                      </Label>
                    </FormGroup>
                    <FormGroup className="col-sm-12 formAwe" check>
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
                        False là đáp án chính xác&nbsp;
                        <span className="text-danger">*</span>
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
          {typeTest === "MULTIPLE CHOICE" && (
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
                  <Row>
                    <FormGroup className="col-sm-12">
                      <Label>
                        Hình ảnh hoặc video&nbsp;
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        name="attachment"
                        tag={Field}
                        placeholder="Nhập hình ảnh hoặc video"
                        type="file"
                        value={values.attachment}
                        invalid={!!(touched.attachment && errors.attachment)}
                      />
                    </FormGroup>
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
                        id="exampleCheck"
                        name="check"
                        type="checkbox"
                        onChange={(e) => setIsCorrect1(!isCorrect1)}
                      />{" "}
                      <Label style={styleLableCk}>Đáp án 1 chính xác</Label>
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
                        id="exampleCheck"
                        name="check"
                        type="checkbox"
                        onChange={(e) => setIsCorrect2(!isCorrect2)}
                      />{" "}
                      <Label style={styleLableCk}>Đáp án 2 chính xác</Label>
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
                        id="exampleCheck"
                        name="check"
                        type="checkbox"
                        onChange={(e) => setIsCorrect3(!isCorrect3)}
                      />{" "}
                      <Label style={styleLableCk}>Đáp án 3 chính xác</Label>
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
                        id="exampleCheck"
                        name="check"
                        type="checkbox"
                        onChange={(e) => setIsCorrect4(!isCorrect4)}
                      />{" "}
                      <Label style={styleLableCk}>Đáp án 4 chính xác</Label>
                    </FormGroup>
                    <FormGroup className="col-sm-12 formAwe" check>
                      <Label>
                        Câu trả lời thứ 5&nbsp;
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        name="answer5"
                        tag={Field}
                        placeholder="Nhập đáp án thứ 5"
                        value={values.answer5}
                        invalid={!!(touched.answer5 && errors.answer5)}
                      />
                      <Input
                        style={styleCk}
                        id="exampleCheck"
                        name="check"
                        type="checkbox"
                        onChange={(e) => setIsCorrect5(!isCorrect5)}
                      />{" "}
                      <Label style={styleLableCk}>Đáp án 5 chính xác</Label>
                    </FormGroup>
                    <FormGroup className="col-sm-12 formAwe" check>
                      <Label>
                        Câu trả lời thứ 6&nbsp;
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        name="answer6"
                        tag={Field}
                        placeholder="Nhập đáp án thứ 6"
                        value={values.answer6}
                        invalid={!!(touched.answer6 && errors.answer6)}
                      />
                      <Input
                        style={styleCk}
                        id="exampleCheck"
                        name="check"
                        type="checkbox"
                        onChange={(e) => setIsCorrect6(!isCorrect6)}
                      />{" "}
                      <Label style={styleLableCk}>Đáp án 6 chính xác</Label>
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
                        placeholder="Nhập điểm"
                        value={values.point}
                        invalid={!!(touched.point && errors.point)}
                      />
                    </FormGroup>
                  </Row>
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
