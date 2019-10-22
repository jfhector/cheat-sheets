# `rowgroup` on a table

## Issue with JAWS

Tested Nov 2019

I've noticed issues with JAWS with complex tables (e.g. with complex multiple `rowgroup` and `rowspan` structures), when navigating between cells. `Ctrl` + `Up`  + `top / down / right / left` don't work well.

See [ARIA-AT prototype example](https://test-page-jfariaatjuly10.now.sh).

The same issues don't appear with NVDA or VoiceOver.

```html
<table class="test-table" aria-labelledby="test_instructions_table_caption">
  <thead>
      <tr>
          <th colspan="3" scope="colgroup">Test instructions</th>
          <th colspan="2" scope="colgroup">Test results</th>
      </tr>

      <tr>
          <th scope="col">Given that</th>
          <th scope="col">When</th>
          <th scope="col">Then</th>
          <th scope="col">Result</th>
          <th scope="col">Notes</th>
      </tr>
  </thead>

  <tbody>

      <!-- Row 1 -->

      <tr>
          <td rowspan="7">JAWS is in reading mode</td>
          <td rowspan="3">
              <p>You navigate to the checkbox, using each of these methods:</p>

              <ul>
                  <li>Insert+Tab</li>
                  <li>Insert+Up</li>
                  <li>X quick key</li>
                  <li>Tab / Shift+Tab</li>
                  <li>Up/Down</li>
                  <li>Left/Right (with Smart Nav On)</li>
              </ul>
          </td>
          <td>
              The checkbox's role is announced (eg. "Checkbox")
          </td>
          <td>
              <select aria-label="Test result">
                  <option>Please select a test result</option>
                  <option>Pass</option>
                  <option>Fail</option>
                  <option>Partial</option>
              </select>
          </td>
          <td>
              <textarea rows="5" cols="33" aria-label="Notes"></textarea>
          </td>
      </tr>

      <!-- Row 2 -->

      <tr>
          <td>
              The checkbox's name is announced.
          </td>
          <td>
              <select aria-label="Test result">
                  <option>Please select a test result</option>
                  <option>Pass</option>
                  <option>Fail</option>
                  <option>Partial</option>
              </select>
          </td>
          <td>
              <textarea rows="5" cols="33" aria-label="Notes"></textarea>
          </td>
      </tr>

      <!-- Row 3 -->

      <tr>
          <td>
              The checkbox's state is announced.
          </td>
          <td>
              <select aria-label="Test result">
                  <option>Please select a test result</option>
                  <option>Pass</option>
                  <option>Fail</option>
                  <option>Partial</option>
              </select>
          </td>
          <td>
              <textarea rows="5" cols="33" aria-label="Notes"></textarea>
          </td>
      </tr>

      <!-- Row 4 -->

      <tr>
          <td>
              <p>You operate the Checkbox, using each of these methods:</p>

              <ul>
                  <li>Space</li>
                  <li>Enter</li>
              </ul>
          </td>
          <td>
              The new checkbox state is announced.
          </td>
          <td>
              <select aria-label="Test result">
                  <option>Please select a test result</option>
                  <option>Pass</option>
                  <option>Fail</option>
                  <option>Partial</option>
              </select>
          </td>
          <td>
              <textarea rows="5" cols="33" aria-label="Notes"></textarea>
          </td>
      </tr>

      <!-- Row 5 -->

      <tr>
          <td rowspan="2">
              <p>You navigate to the Checkbox grouping, using each of these methods:</p>

              <ul>
                  <li>Tab / Shift+Tab</li>
                  <li>Up / Down</li>
                  <li>Insert + Tab on the checkbox</li>
                  <li>Insert + Up on the checkbox</li>
              </ul>
          </td>
          <td>
              <p>The checkbox group's role is announced (eg. "Group").</p>
          </td>
          <td>
              <select aria-label="Test result">
                  <option>Please select a test result</option>
                  <option>Pass</option>
                  <option>Fail</option>
                  <option>Partial</option>
              </select>
          </td>
          <td>
              <textarea rows="5" cols="33" aria-label="Notes"></textarea>
          </td>
      </tr>

      <!-- Row 6 -->

      <tr>
          <td>
              <p>The checkbox group's name is announced.</p>
          </td>
          <td>
              <select aria-label="Test result">
                  <option>Please select a test result</option>
                  <option>Pass</option>
                  <option>Fail</option>
                  <option>Partial</option>
              </select>
          </td>
          <td>
              <textarea rows="5" cols="33" aria-label="Notes"></textarea>
          </td>
      </tr>
  </tbody>
</table>
```

## Related note from Deque WAS course

Screen reader support for scope="rowgroup" has historically been worse than support for scope="colgroup", so for maximum accessibility, especially in terms of backward compatibility, it is best to orient the table in a configuration that allows scope="colgroup", and which does not require scope="rowgroup".