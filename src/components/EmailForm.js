import React, { useState } from 'react'; //usestate reactın state yönetimi için kullandığımız bir fonksiyon yani sayfa yenilenmeden bileşenin içinde veri saklamamızı sağlıyor
import { Input, Button } from 'antd'; //ant design kütüphanesinden gelen hazır görünümlü input (yazı kutusu) ve buton bileşenleri alınıyor

const EmailForm = () => {                     //email form adında fonksiyonel component tanımlandı
  const [formData, setFormData] = useState({  //bu bileşen kullanıcıdan ad,soyad ve eposta bilgisi alacak
    firstName: '',                            //formdata form alanlarının değerlerini saklayan js nesnesi ilk değerler olarak boş verilmiş setformdata formdatayı değiştirmek için kullanılan fonksiyondur
    lastName: '',                             //usestate anlık yazıları saklıyor
    email: '',
  });

  const handleChange = (e) => {            //handlechange fonksiyonu inputlarda  değişiklik oldukça formdata güncelliyor parametre (e) inputa yazı yazmak için seçmek için kullanılır
    setFormData(prev => ({                //prev önceki formdata değeri
      ...prev,                            //...prev önceki tüm key value çiftlerini kopyalar
      [e.target.name]: e.target.value    //hangi input değiştiyse onun nameine karşılık gelen veriyi günceller
    }));                                  //e.target.value o inputa yazılan yeni değer
  };

  const handleSave = async () => {              //handlesave fonksiyonu backendde post isteği yapıyor başarılı olursa kullanıcıya mesaj gösterip formu temizliyor                                             
    try {                                       //async yazmasının sebebi asenkron çalışıyor yani bazı işlemleri bekleyip sonra devam ediyor
      const response = await fetch('http://localhost:5213/api/EmailUsers', {  //fetch backende C# apiye http isteği atıyoruz post isteği yani backende yeni kayıt ekliyoruz
        method: 'POST',   //get veri çeker post yeni veri ekler put veri günceller delete veri siler
        headers: { 'Content-Type': 'application/json' }, //backende json gönderiyoruz
        body: JSON.stringify(formData) //formdata formda girilen isim,soyisim, eposta bilgilerini tutuyor,JSON.stringify javascriptteki nesneyi json çevirir
      });

      if (!response.ok) throw new Error('Kayıt başarısız');

      alert('Başarıyla kaydedildi!');
      setFormData({ firstName: '', lastName: '', email: '' }); //kayıt başarılı olursa formu temizliyor
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={{ padding: '10px', maxWidth: '400px' }}>
      <Input
        name="firstName" //input alanının adı
        placeholder="Adı" //kutunun içine adı yazıyor yazdıkça kayboluyor
        value={formData.firstName} //kutunun içindeki değer formdata stateinden geliyor
        onChange={handleChange}  //kullanıcı yazı yazdğında handlechange çalışıyor
        style={{ marginBottom: '12px' }} //her kutunun altına 12px boşluk bırakıyor
      />
      <Input
        name="lastName"
        placeholder="Soyadı"
        value={formData.lastName}
        onChange={handleChange}
        style={{ marginBottom: '12px' }}
      />
      <Input
        name="email"
        type="email"  //bu kutuya e-posta girilecek bilgisi verildi.Yanlış formatta yazılırsa hata verebilir.
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        style={{ marginBottom: '12px' }}
      />
      <Button type="primary" onClick={handleSave}>Save</Button>
    </div>
    //padding 10px kutunun içindeki yazılar ve kenar arasına boşluk bırakır, maxWidth 400px ile kutunun genişliğini sınırlar
    //type="primary" Ant Design’da mavi ve ön planda görünen buton stili.
    //onClick butona tıklandığında handleSave fonksiyonunu çağırır

  );
};

export default EmailForm;
