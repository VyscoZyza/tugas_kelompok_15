import React, { useState } from "react";
import { Badge, Card, Col, ListGroup, Row } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import Keranjang from "./Keranjang";
import TotalBayar from "./TotalBayar";
import { API_URL } from "../utils/constants";
import axios from "axios";
import swal from "sweetalert";

export default function Hasil(props) {
  const [showModal, setShowModal] = useState(false);
  const [keranjangDetail, setKeranjangDetail] = useState(false);
  const [jumlah, setJumlah] = useState(0);
  const [keterangan, setKeterangan] = useState("");
  const [totalHarga, setTotalHarga] = useState(0);

  const handleShow = (menuKeranjang) => {
    setShowModal(true);
    setKeranjangDetail(menuKeranjang);
    setJumlah(menuKeranjang.jumlah);
    setKeterangan(menuKeranjang.keterangan);
    setTotalHarga(menuKeranjang.total_harga);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const tambah = () => {
    setJumlah(jumlah + 1);
    setTotalHarga(keranjangDetail.product.harga * (jumlah + 1));
  };

  const kurang = () => {
    if (jumlah !== 1) {
      setJumlah(jumlah - 1); // why coma
      setTotalHarga(keranjangDetail.product.harga * (jumlah - 1));
    }
  };

  const changeHandler = (event) => {
    setKeterangan(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    handleClose();

    const data = {
      jumlah: jumlah,
      total_harga: totalHarga,
      product: keranjangDetail.product,
      keterangan: keterangan,
    };

    axios
      .put(API_URL + "keranjangs/" + keranjangDetail.id, data)
      .then((res) => {
        swal({
          title: "Update Pesanan!",
          text: "Sukses Update Pesanan " + data.product.nama,
          icon: "success",
          button: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });
  };

  const hapusPesanan = (id) => {
    handleClose();

    axios
      .delete(API_URL + "keranjangs/" + id)
      .then((res) => {
        swal({
          title: "Hapus Pesanan!",
          text: "Sukses Hapus Pesanan " + keranjangDetail.product.nama,
          icon: "error",
          button: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });
  };
  console.log(keranjangs);
  const { keranjangs } = useState(props);
  return (
    <Col md={3} className="mt-3">
      <h4>
        <strong>Keranjang</strong>
      </h4>

      {keranjangs.length !== 0 && (
        <Card className="overflow-auto hasil ">
          <ListGroup variant="flush">
            <Row className="category-aktif">
              <Col xs={2} className="ml-3 mt-2">
                <h5 className="ml-2">Jml</h5>
              </Col>
              <Col>
                <h5 className="mt-2">Produk</h5>
              </Col>
              <Col>
                <strong className="float-right mr-3 mt-2">Total Harga</strong>
              </Col>
            </Row>
            {keranjangs.map((menuKeranjang) => (
              <ListGroup.Item
                key={menuKeranjang.id}
                onClick={() => handleShow(menuKeranjang)}
              >
                <Row>
                  <Col xs={2}>
                    <h4>
                      <Badge pill variant="primary">
                        {menuKeranjang.jumlah}
                      </Badge>
                    </h4>
                  </Col>
                  <Col>
                    <h5>{menuKeranjang.product.nama}</h5>
                    <p>Rp. {numberWithCommas(menuKeranjang.product.harga)}</p>
                  </Col>
                  <Col>
                    <strong className="float-right">
                      Rp. {numberWithCommas(menuKeranjang.total_harga)}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}

            <Keranjang
              handleClose={handleClose}
              {...props}
              tambah={tambah}
              kurang={kurang}
              changeHandler={changeHandler}
              handleSubmit={handleSubmit}
              hapusPesanan={hapusPesanan}
            />
          </ListGroup>
        </Card>
      )}

      <TotalBayar keranjangs={keranjangs} {...this.props} />
    </Col>
  );
}
