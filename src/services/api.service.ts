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

  private _oauthKey: string;
  private _clientKeyPair: BoxKeyPair;
  private _serverPublicKey: Uint8Array;

  constructor(private _http: HttpClient) {
    this._clientKeyPair = box.keyPair();
  }

  setOAuthKey(key: string) {
    this._oauthKey = key;
  }

  isLoggedIn(): boolean {
    return !!this._oauthKey;
  }

  getLoggedInUser(): Observable<any> {
    return new Observable((observer) => {
      this._getServerPublicKey()
        .subscribe(() => {
          this._http
            .get(`${environment.api}/api/logged-in-user`, {
            }).subscribe((data: any) => {
              observer.next(data);
              observer.complete();
            }, (error) => {
              observer.error(error);
              observer.complete();
            });
        });
    });
  }

  getCourses(): Observable<any> {
    return new Observable(observer => {
      this._http
        .get(`${environment.api}/api/proxy/api/v1/courses`, {
          params: {
            'per_page': '100',
            'include[]': ['public_description', 'course_image']
          },
        }).subscribe((data: any) => {
          observer.next(data);
          observer.complete();
        }, (error) => {
          observer.error(error);
          observer.complete();
        });
    });
  }

  getCourseforUserinput(options: any): Observable<any> {
    return new Observable(observer => {
      this._getServerPublicKey()
        .subscribe(() => {
          this._http
            .get(`${environment.api}/api/proxy/api/v1/courses`, {
              params: {
                'per_page': '100',
              },
              headers: {
                api_token: this._encrypt(options.oauthKey),
                client_key: encodeBase64(this._clientKeyPair.publicKey)
              }
            }).subscribe((data: any) => {
              observer.next(data);
              observer.complete();
            }, (error) => {
              observer.error(error);
              observer.complete();
            });
        });
    });
  }

  getCourseStudents(courseId: string, option: any): Observable<any> {
    return new Observable(observer => {
      this._getServerPublicKey()
        .subscribe(() => {
          this._http
            .get(`${environment.api}/api/course-students`, {
              params: {
                courseId: courseId
              },
              headers: {
                api_token: this._encrypt(option.oauthKey),
                client_key: encodeBase64(this._clientKeyPair.publicKey)
              }
            }).subscribe((data: any) => {
              observer.next(data);
              observer.complete();
            }, (error) => {
              observer.error(error);
              observer.complete();
            });
        });
    });
  }

  sendCertificates(courseId: string, selectedStudents: any, option: any): Observable<any> {
    return new Observable(observer => {
      this._http.post(`${environment.api}/api/send-certificates`, selectedStudents, {
        params: {
          courseId: courseId
        },
        headers: {
          api_token: this._encrypt(option.oauthKey),
          client_key: encodeBase64(this._clientKeyPair.publicKey)
        }
      }).subscribe((data: any) => {
        observer.next(data);
        observer.complete();
      }, (error) => {
        observer.error(error);
        observer.complete();
      });
    });
  }

  private _getServerPublicKey(): Observable<Uint8Array> {
    return new Observable(observer => {
      if (!this._serverPublicKey) {
        this._http.get(`${environment.api}/api/keys`)
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
