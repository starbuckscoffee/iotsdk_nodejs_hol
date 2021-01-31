// 
//  onSetFanState 関数を変更します。
//  これにより、関数の成功セクションで、ファンの更新された状態が報告されます。 
//  response.send(200, 'Fan state set: ' + request.payload, directMethodResponse); ステートメントの後に次の行を追加します。
//

// Confirm changes to reported properties.
        sendReportedProperties();
        
        
