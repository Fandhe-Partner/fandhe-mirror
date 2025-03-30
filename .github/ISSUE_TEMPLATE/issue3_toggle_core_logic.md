---
name: "[Feature] Implement core logic for Toggle component using XState"
about: Implement Toggle component core logic in mirror-ui-base
title: "[Feature] Implement core logic for Toggle component using XState in packages/mirror-ui-base"
labels: enhancement, feature, component:toggle
assignees: ''
---

## Task Description

This issue is for implementing the core logic for the Toggle component using XState in the `packages/mirror-ui-base` package.

### Reference Information

**Zag UI Toggle Component Investigation Results:**

```text
Zag UI の Button（Toggle）コンポーネント実装調査結果
指定されたリポジトリ内では、Button コンポーネントと完全に一致する実装は見つかりませんでしたが、類似の機能を持つ Toggle コンポーネントが実装されています。Toggle は機能的に Button の特性を多く持っているため、これを調査対象として報告します。

1.  **状態 (States)**
    * Toggle マシンは非常にシンプルな状態管理を行っています：
        * `idle`: 唯一の明示的な状態として定義されています。
    * 内部的には `pressed` と `disabled` の値によって状態が表現されています。

2.  **イベント (Events/Transitions)**
    * 主要なイベントは以下の2つです：
        * `PRESS.TOGGLE`: ボタンが押された状態を反転するイベント。
        * `PRESS.SET`: ボタンが押された状態を特定の値に設定するイベント。
    * 遷移パターンとしては、イベント発生時にアクションを実行するシンプルな設計になっています。

3.  **コンテキスト (Context)**
    * ステートマシンが内部で管理しているデータ：
        * `pressed`: ボタンが押されているかどうかの状態。
    * このコンテキストはバインド可能（bindable）として実装されており、値の変更時に `onPressedChange` コールバックが呼び出されます。

4.  **アクション (Actions)**
    * 主なアクションは以下の2つです：
        * `togglePressed`: 現在の `pressed` 状態を反転するアクション。
        * `setPressed`: `pressed` 状態を特定の値に設定するアクション。

5.  **`connect` 関数**
    * **目的・役割:** ステートマシンの状態をUIコンポーネントのプロパティに変換する役割を持ちます。
    * **生成するProps (Root要素 - ボタン):**
        * `type="button"`: ボタンタイプの指定。
        * `disabled`: 無効状態を示す属性。
        * `aria-pressed`: アクセシビリティのための押下状態属性。
        * `data-state`: "on" または "off" の値を持つ状態を示すデータ属性。
        * `data-pressed`: 押された状態を示すデータ属性。
        * `data-disabled`: 無効状態を示すデータ属性。
        * `onClick`: クリックイベントハンドラ（無効状態やデフォルト動作の防止を考慮）。
    * **生成するProps (インジケーター要素):** 各種データ属性（disabled, pressed, state）を設定。

6.  **アクセシビリティ (Accessibility)**
    * **ARIA属性の管理:** `aria-pressed` 属性が自動的に設定され、ボタンの押下状態をスクリーンリーダーに伝えます。
    * **キーボード操作:** 明示的なキーボードイベントハンドラは実装されていませんが、`button` 要素のデフォルト動作として、Enterキーやスペースキーでのクリック操作が自動的にサポートされています。

**Notes**
* Toggle コンポーネントは非常にシンプルな状態管理 (`pressed`) に焦点を当てています。
* アクセシビリティについては `aria-pressed` が適切に設定されています。
* ステートマシンベースの設計とDOM操作を分離する良い例になっています。
```

### Tasks

1. Create and implement the following files for the Toggle component:
   - `packages/mirror-ui-base/src/machines/toggle/types.ts`: Type definitions for the Toggle component
   - `packages/mirror-ui-base/src/machines/toggle/machine.ts`: State machine definition using `xstate.createMachine` (reference the states, events, context, and actions from the investigation results)
   - `packages/mirror-ui-base/src/machines/toggle/connect.ts`: Implement the `connect` function (reference the role and generated props from the investigation results)

### Expected Deliverables

- Toggle component core logic files in the `src/machines/toggle/` directory

### Notes

This issue is specifically for Toggle component core logic implementation in the `packages/mirror-ui-base` directory.
