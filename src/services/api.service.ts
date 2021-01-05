import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { box, randomBytes, BoxKeyPair } from 'tweetnacl';
import {
  decodeUTF8,
  encodeUTF8,
  encodeBase64,
  decodeBase64
} from 'tweetnacl-util';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private _clientKeyPair: BoxKeyPair;
  private _serverPublicKey: Uint8Array;

  constructor(private _http: HttpClient) {
    this._clientKeyPair = box.keyPair();
  }

  getCourses(options: any): Observable<any> {
    return new Observable(observer => {
      this._getServerPublicKey()
        .subscribe(() => {
          this._http
            .get(`${environment.api}/proxy/api/v1/courses`, {
              params: {
                'per_page': '100'
              },
              headers: {
                api_token: this._encrypt(options.oauthKey),
                client_key: encodeBase64(this._clientKeyPair.publicKey)
              }
            }).subscribe((data: any) => {
              observer.next(data);
              observer.complete();
            });
        });
    });
  }

  getCourseStudents(courseId: string, options: any): Observable<any> {
    return new Observable(observer => {
      this._getServerPublicKey()
        .subscribe(() => {
          this._http
            .get(`${environment.api}/course-students`, {
              params: {
                courseId: courseId
              },
              headers: {
                api_token: this._encrypt(options.oauthKey),
                client_key: encodeBase64(this._clientKeyPair.publicKey)
              }
            }).subscribe((data: any) => {
              observer.next(data);
              observer.complete();
            });
        });
    });
  }

  // getCourseModulesForStudent(courseId: string, studentId: string, options: any): Observable<any> {
  //   return new Observable(observer => {
  //     this._getServerPublicKey()
  //       .subscribe(() => {
  //         this._http
  //           .get(`${environment.api}/proxy/api/v1/courses/${courseId}/modules`, {
  //             params: {
  //               'student_id': studentId,
  //               'include[]': 'items',
  //               'per_page': '100'
  //             },
  //             headers: {
  //               api_token: this._encrypt(options.oauthKey),
  //               client_key: encodeBase64(this._clientKeyPair.publicKey)
  //             }
  //           }).subscribe((data: any) => {
  //             observer.next(data);
  //             observer.complete();
  //           });
  //       });
  //   });
  // }

  sendCertificates(courseId: string, options: any): Observable<any> {
    return new Observable(observer => {
      this._http.post(`${environment.api}/send-certificates`, null, {
        params: {
          courseId: courseId
        },
        headers: {
          api_token: this._encrypt(options.oauthKey),
          client_key: encodeBase64(this._clientKeyPair.publicKey)
        }
      }).subscribe((data: any) => {
        observer.next(data);
        observer.complete();
      });
    });
  }

  private _getServerPublicKey(): Observable<Uint8Array> {
    return new Observable(observer => {
      if (!this._serverPublicKey) {
        this._http.get(`${environment.api}/keys`)
          .subscribe((data: any) => {
            const keyRaw = data.publicKey;
            const key = decodeBase64(keyRaw);
            this._serverPublicKey = key;
            observer.next(key);
            observer.complete();
          });
      } else {
        observer.next(this._serverPublicKey);
        observer.complete();
      }
    });
  }

  private _encrypt(message: string) {
    const nonce = randomBytes(box.nonceLength);
    const messageUint8 = decodeUTF8(message);
    const encrypted = box(messageUint8, nonce, this._serverPublicKey, this._clientKeyPair.secretKey);

    const fullMessage = new Uint8Array(nonce.length + encrypted.length);
    fullMessage.set(nonce);
    fullMessage.set(encrypted, nonce.length);

    const base64FullMessage = encodeBase64(fullMessage);
    return base64FullMessage;
  };
}
